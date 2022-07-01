import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PlantPositionsEntity} from "./plant-positions.entity";
import {PlantPositionsDto} from "./dto/plant-positions.dto";
import {Repository} from "typeorm";
import {ReadPlantPositionsResponseDto} from "./read-plant-positions-response.dto";
import {PlantsService} from "../plants/plants.service";
import {CreatePlantPositionRequestDto} from "./dto/request/create-plant-position-request.dto";
import {DeletePlantPositionRequestDto} from "./dto/request/delete-plant-position-request.dto";

@Injectable()
export class PlantPositionsService {
    constructor(
        @InjectRepository(PlantPositionsEntity)
        private readonly plantPositionsRepository: Repository<PlantPositionsEntity>,
        @Inject(PlantsService)
        private readonly plantService: PlantsService
    ) {
    }

    async canCreate(createRequest: CreatePlantPositionRequestDto): Promise<boolean> {
        return await this.plantService.isValidAsync(createRequest.plant_id);
    }

    create(plantPosition: { plant_id, x_pos, y_pos }): Promise<PlantPositionsDto> {
        return this.plantPositionsRepository.save(plantPosition);
    }

    async updateOrSwap(id, source, destination) {
        const plantPositionFound = await this.findByPosition(destination);
        if (plantPositionFound !== undefined) {
            await this.swap(plantPositionFound, source);
        }
        await this.update(id, destination);
    }

    async delete(request: DeletePlantPositionRequestDto) {
        await this.plantPositionsRepository.delete({
            x_pos: request.x_pos,
            y_pos: request.y_pos
        });
        return {deleted: true};
    }

    verify(left: PlantPositionsDto, request: DeletePlantPositionRequestDto): boolean {
        return left.x_pos === request.x_pos && left.y_pos === request.y_pos;
    }

    async exists(position: CreatePlantPositionRequestDto): Promise<boolean> {
        return await this.findByPosition({x_pos: position.x_pos, y_pos: position.y_pos}) !== undefined;
    }

    async findByPosition(entity: { x_pos, y_pos }): Promise<PlantPositionsDto> {
        return await this.plantPositionsRepository.findOne({
            where: {
                x_pos: entity.x_pos,
                y_pos: entity.y_pos
            }
        });
    }

    async findAll(): Promise<ReadPlantPositionsResponseDto> {
        return {plants: await this.plantPositionsRepository.find()};
    }

    async findById(id: number): Promise<PlantPositionsDto | undefined> {
        return await this.plantPositionsRepository.findOne({id: id});
    }

    async swap(source: PlantPositionsDto, destination: PlantPositionsDto) {
        await this.update(source.id, {
            plant_id: source.plant_id,
            x_pos: destination.x_pos,
            y_pos: destination.y_pos
        });
    }

    async update(id: number, plantPosition: { plant_id, x_pos, y_pos }): Promise<{ plant_id, x_pos, y_pos }> {
        await this.plantPositionsRepository.update(id, plantPosition);
        return plantPosition;
    }
}
