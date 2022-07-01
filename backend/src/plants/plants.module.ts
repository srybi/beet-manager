import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PlantPositionsEntity} from "../plantpositions/plant-positions.entity";
import {PlantPositionsModule} from "../plantpositions/plant-positions.module";
import {PlantRelationsEntity} from "../plantrelations/plant-relations.entity";
import {PlantRelationsModule} from "../plantrelations/plant-relations.module";
import {PlantRelationsService} from "../plantrelations/plant-relations.service";
import {PlantsController} from './plants.controller';
import {PlantsEntity} from "./plants.entity";
import {PlantsService} from './plants.service';

@Module({
    controllers: [PlantsController],
    exports: [PlantsService],
    imports: [
        PlantRelationsModule,
        forwardRef(() => PlantPositionsModule),
        TypeOrmModule.forFeature([PlantsEntity, PlantPositionsEntity, PlantRelationsEntity])],
    providers: [PlantsService, PlantRelationsService]
})
export class PlantsModule {
}
