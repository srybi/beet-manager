import {Controller, Get, HttpStatus, Inject, Res} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {BedLocationsResponseDto} from "./bed-locations-response.dto";
import {BedLocationsService} from "./bed-locations.service";
import {Localization} from "../../common/localization";
import {SwaggerTags} from "../../common/swagger-tags";

@ApiTags(SwaggerTags.Beds)
@Controller('beds')
export class BedLocationsController {
    constructor(@Inject(BedLocationsService)
                private readonly bedLocationsService: BedLocationsService) {
    }

    @ApiOkResponse({description: Localization.BedLocationsGet, type: BedLocationsResponseDto})
    @Get('locations')
    async fetchAll(@Res() response): Promise<string> {
        const locations = await this.bedLocationsService.findAll();
        return response.status(HttpStatus.OK).json(locations);
    }
}
