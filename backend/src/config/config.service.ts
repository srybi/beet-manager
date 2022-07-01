import {BedLocationsEntity} from "../bed/bed-locations/bed-locations.entity";
import {BedTypesEntity} from "../bed/bed-types/bed-types.entity";
import {OrientationsEntity} from "../bed/orientations/orientations.entity";
import {PlantRelationsEntity} from "../plantrelations/plant-relations.entity";
import {PlantsEntity} from "../plants/plants.entity";
import {PlantPositionsEntity} from "../plantpositions/plant-positions.entity";
import {UsersEntity} from "../users/users.entity";

export class ConfigService {
    private static config = require('config');

    private static _appConfig = {
        jwt: this.config.get('jwt'),
        user: this.config.get('user')
    };

    private static _dbConfig = {
        type: 'mariadb',
        host: this.config.get('database.host'),
        port: this.config.get('database.port'),
        username: this.config.get('database.user'),
        password: this.config.get('database.password'),
        database: this.config.get('database.name'),
        entities: [
            BedLocationsEntity, BedTypesEntity, OrientationsEntity, // bed related entities
            PlantsEntity, PlantPositionsEntity, PlantRelationsEntity, // plant related entities
            UsersEntity
        ]
    };

    static getNaturalNumberOrDefault(jsonValue: any, defaultValue: number): number {
        return Number.isInteger(jsonValue) && jsonValue >= 0 ? jsonValue : defaultValue;
    }

    /**
     * Returns a cached config object parsed from the config file from backend/config/<mode>.json
     */
    static get appConfig() {
        return this._appConfig;
    }

    /**
     * Returns a cache database config object parsed from the config file from backend/config/<mode>.json
     */
    static get dbConfig() {
        return this._dbConfig;
    }
}
