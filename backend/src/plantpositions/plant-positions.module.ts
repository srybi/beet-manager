import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlantPositionsController} from "./plant-positions.controller";
import {PlantPositionsEntity} from "./plant-positions.entity";
import {PlantPositionsService} from './plant-positions.service';
import {PlantsEntity} from "../plants/plants.entity";
import {PlantsModule} from "../plants/plants.module";

@Module({
    controllers: [PlantPositionsController],
    exports: [PlantPositionsService],
    imports: [
        forwardRef(() => PlantsModule),
        TypeOrmModule.forFeature([PlantsEntity, PlantPositionsEntity])
    ],
    providers: [PlantPositionsService]
})
export class PlantPositionsModule {
}
