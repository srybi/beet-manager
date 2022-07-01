import {Controller, Get, HttpStatus, Inject, Res, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {PlantsService} from './plants.service';
import {ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ReadPlantsResponseDto} from "./read-plants-response.dto";
import {ErrorResponseDto} from "../common/error-response.dto";
import {Localization} from "../common/localization";
import { SwaggerTags } from 'src/common/swagger-tags';

@ApiTags(SwaggerTags.Plants)
@Controller('plants')
export class PlantsController {
    constructor(@Inject(PlantsService)
                private readonly plantService: PlantsService) {
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: Localization.PlantsGet, type: ReadPlantsResponseDto})
    @ApiUnauthorizedResponse({description: Localization.NotLoggedIn, type: ErrorResponseDto})
    @UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response): Promise<string> {
        const plants = await this.plantService.findSuggestionsAsync();
        return response.status(HttpStatus.OK).json(plants);
    }
}
