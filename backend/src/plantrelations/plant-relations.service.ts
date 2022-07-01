import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PlantRelationsDto} from "./plant-relations.dto";
import {PlantRelationsEntity} from "./plant-relations.entity";

@Injectable()
export class PlantRelationsService {
    constructor(
        @InjectRepository(PlantRelationsEntity)
        private readonly plantRelationsRepository: Repository<PlantRelationsEntity>) {
    }

    /**
     * Returns all positive and neutral neighbor relations of the existing plant id specified
     * @param existingPlantId the plant ID to search for
     */
    async findAllById(existingPlantId: number): Promise<PlantRelationsDto[]> {
        return await this.plantRelationsRepository.find({
            where: [
                {plant_id_1: existingPlantId},
                {plant_id_2: existingPlantId}
            ]
        });
    }
}
