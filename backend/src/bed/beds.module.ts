import {Module} from '@nestjs/common';
import {BedLocationsController} from "./bed-locations/bed-locations.controller";
import {BedLocationsEntity} from "./bed-locations/bed-locations.entity";
import {BedLocationsService} from "./bed-locations/bed-locations.service";
import {BedTypesController} from "./bed-types/bed-types.controller";
import {BedTypesEntity} from "./bed-types/bed-types.entity";
import {BedTypesService} from "./bed-types/bed-types.service";
import {OrientationsController} from "./orientations/orientations.controller";
import {OrientationsEntity} from "./orientations/orientations.entity";
import {OrientationsService} from "./orientations/orientations.service";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    controllers: [BedLocationsController, BedTypesController, OrientationsController],
    imports: [TypeOrmModule.forFeature([BedLocationsEntity, BedTypesEntity, OrientationsEntity])],
    providers: [BedLocationsService, BedTypesService, OrientationsService]
})
export class BedsModule {
}
