import {Module} from '@nestjs/common';
import {PlantRelationsEntity} from "./plant-relations.entity";
import {PlantRelationsService} from './plant-relations.service';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    exports: [PlantRelationsService],
    imports: [TypeOrmModule.forFeature([PlantRelationsEntity])],
    providers: [PlantRelationsService]
})
export class PlantRelationsModule {
}
