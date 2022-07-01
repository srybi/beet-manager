import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PlantPositionsDto} from "../plantpositions/dto/plant-positions.dto";
import {PlantPositionsService} from "../plantpositions/plant-positions.service";
import {PlantRelationsDto} from "../plantrelations/plant-relations.dto";
import {PlantRelationsService} from "../plantrelations/plant-relations.service";
import {PlantsDto} from "./plants.dto";
import {PlantsEntity} from './plants.entity';
import {Repository} from 'typeorm';
import {ReadPlantsResponseDto} from "./read-plants-response.dto";

@Injectable()
export class PlantsService {
    constructor(
        @InjectRepository(PlantsEntity)
        private readonly plantsRepository: Repository<PlantsEntity>,
        @Inject(forwardRef(() => PlantPositionsService))
        private readonly plantPositionsService: PlantPositionsService,
        @Inject(PlantRelationsService)
        private readonly plantRelationsService: PlantRelationsService
    ) {
    }

    /**
     * Returns the plant ID of the other plant of a relation
     * @param existingPlant the plant to compare with
     * @param relation the plant relation to check
     */
    static getComparablePlantId(existingPlant: PlantsDto, relation: PlantRelationsDto) {
        if (relation.plant_id_1 === existingPlant.id) {
            return relation.plant_id_2;
        }
        return relation.plant_id_1;
    }

    static getDominantHarmony(original: number, newHarmony: number) {
        function isBadNeighbor(mod: number) {
            return mod <= -1;
        }

        function isGoodNeighbor(original: number, mod: number) {
            return original >= 0 && mod >= 1;
        }

        if (isBadNeighbor(newHarmony) || isGoodNeighbor(original, newHarmony)) {
            return newHarmony;
        }
        return original;
    }

    /**
     * Returns a distinct list of distinct plants checked by their IDs.
     * @param array the plant entities to sieve
     */
    static removePlantDuplicates(array: PlantsDto[]): PlantsDto[] {
        array = array.reduce((accumulator, current) => {
            if (!accumulator.some((item) => item.id === current.id)) {
                accumulator.push(current);
            }
            return accumulator;
        }, []);
        return array;
    }

    static updateHarmony(suggestions: PlantsDto[], plantId: number, item: PlantRelationsDto) {
        const index = suggestions.findIndex(p => p.id === plantId);
        suggestions[index].harmony = PlantsService.getDominantHarmony(suggestions[index].harmony, item.harmony);
    }

    static updateHarmonies(existingPlant: PlantsDto, suggestions: PlantsDto[], suggestedRelations: PlantRelationsDto[]) {
        for (let item of suggestedRelations) {
            const plantId = PlantsService.getComparablePlantId(existingPlant, item);
            PlantsService.updateHarmony(suggestions, plantId, item);
        }
    }

    /**
     * Returns all plants persisted in database.
     */
    async findAllAsync(): Promise<PlantsDto[]> {
        return await this.plantsRepository.find();
    }

    /**
     * Returns the plants planted by its position entities.
     * @param positions the position entities occupied
     */
    async findByPositionsAsync(positions: PlantPositionsDto[]): Promise<PlantsDto[]> {
        let result = [];
        for (const position of positions) {
            const plant = await this.findOneByPositionAsync(position);
            result = [...result, plant];
        }
        return result;
    }

    /**
     * Searches in database for the plant ID specified.
     * @param id the plant ID to find
     */
    async findOneAsync(id: number): Promise<PlantsDto> {
        return await this.plantsRepository.findOne({where: {id: id}});
    }

    /**
     * Returns the plant planted by its position entity.
     * @param position the position entity occupied
     */
    async findOneByPositionAsync(position: PlantPositionsDto): Promise<PlantsDto> {
        return await this.findOneAsync(position.plant_id);
    }

    /**
     * Returns all plants planted in bed.
     */
    async findPositionedAsync(): Promise<PlantsDto[]> {
        const positions = await this.plantPositionsService.findAll();
        return await this.findByPositionsAsync(positions.plants);
    }

    /**
     * Returns all currently suggested plants depending on the plants planted in bed.
     * When there are no plants in bed, all existing plants will be returned.
     * Otherwise, all good and neutral plant neighbors will be returned.
     */
    async findSuggestionsAsync(): Promise<ReadPlantsResponseDto> {
        let existingPlants = await this.findPositionedAsync();
        const allPlants = await this.findAllAsync();
        if (existingPlants.length === 0) {
            // Could not find any plant in bed
            return {plants: allPlants};
        }
        existingPlants = PlantsService.removePlantDuplicates(existingPlants);

        // Request suggestions
        let result: PlantsDto[] = [...allPlants];
        for (const existingPlant of existingPlants) {
            let suggestedRelations = await this.plantRelationsService.findAllById(existingPlant.id);
            PlantsService.updateHarmonies(existingPlant, result, suggestedRelations);
        }

        result.sort((left, right) => {
            return right.harmony - left.harmony;
        });

        return {plants: result};
    }

    /**
     * Returns whether the plant ID specified exists in the database.
     * @param plantId the plant ID to check
     */
    async isValidAsync(plantId: number): Promise<boolean> {
        return await this.findOneAsync(plantId) !== undefined;
    }
}
