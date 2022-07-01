import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AuthModule} from "../auth/auth.module";
import {BedsModule} from "../bed/beds.module";
import {ConfigService} from '../config/config.service';
import {PlantPositionsModule} from 'src/plantpositions/plant-positions.module';
import {PlantsModule} from '../plants/plants.module';
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        AuthModule,
        forwardRef(() => UsersModule),
        forwardRef(() => PlantsModule),
        forwardRef(() => PlantPositionsModule),

        BedsModule,

        TypeOrmModule.forRoot(<TypeOrmModuleOptions>ConfigService.dbConfig),
    ],
    controllers: [AppController]
})
export class AppModule {
}
