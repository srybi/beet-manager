import {Controller, Get, HttpStatus, Inject, Res} from '@nestjs/common';
import {OrientationsService} from "./orientations.service";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {OrientationsResponseDto} from "./orientations-reponse.dto";
import {SwaggerTags} from "../../common/swagger-tags";
import {Localization} from "../../common/localization";

@ApiTags(SwaggerTags.Beds)
@Controller('beds')
export class OrientationsController {
    constructor(@Inject(OrientationsService)
                private readonly orientationsService: OrientationsService) {
    }

    @ApiOkResponse({description: Localization.BedOrientationsGet, type: OrientationsResponseDto})
    @Get('orientations')
    async fetchAll(@Res() response): Promise<string> {
        const orientations = await this.orientationsService.findAll();
        return response.status(HttpStatus.OK).json(orientations);
    }
}

