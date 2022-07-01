import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {BedLocationsEntity} from "./bed-locations.entity";
import {Repository} from "typeorm";
import {BedLocationsResponseDto} from "./bed-locations-response.dto";

@Injectable()
export class BedLocationsService {
    constructor(
        @InjectRepository(BedLocationsEntity)
        private readonly bedLocationsRepository: Repository<BedLocationsEntity>) {
    }

    async findAll(): Promise<BedLocationsResponseDto> {
        return {locations: await this.bedLocationsRepository.find()};
    }
}
