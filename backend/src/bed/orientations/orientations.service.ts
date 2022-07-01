import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {OrientationsEntity} from "./orientations.entity";
import {Repository} from "typeorm";
import {OrientationsResponseDto} from "./orientations-reponse.dto";

@Injectable()
export class OrientationsService {
    constructor(
        @InjectRepository(OrientationsEntity)
        private readonly orientationsRepository: Repository<OrientationsEntity>,) {
    }

    async findAll(): Promise<OrientationsResponseDto> {
        return {orientations: await this.orientationsRepository.find()};
    }
}
