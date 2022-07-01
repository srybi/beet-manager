import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {BedTypesEntity} from "./bed-types.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {BedTypesResponseDto} from "./bed-types-response.dto";

@Injectable()
export class BedTypesService {
    constructor(
        @InjectRepository(BedTypesEntity)
        private readonly bedTypesRepository: Repository<BedTypesEntity>) {
    }

    async findAll(): Promise<BedTypesResponseDto> {
        return {types: await this.bedTypesRepository.find()};
    }
}
