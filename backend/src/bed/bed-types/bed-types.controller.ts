import {Controller, Get, HttpStatus, Inject, Res} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {BedTypesResponseDto} from "./bed-types-response.dto";
import {BedTypesService} from "./bed-types.service";
import {SwaggerTags} from "../../common/swagger-tags";
import {Localization} from "../../common/localization";

@ApiTags(SwaggerTags.Beds)
@Controller('beds')
export class BedTypesController {
    constructor(@Inject(BedTypesService)
                private readonly bedTypesService: BedTypesService) {
    }

    @ApiOkResponse({description: Localization.BedTypesGet, type: BedTypesResponseDto})
    @Get('types')
    async fetchAll(@Res() response): Promise<string> {
        const types = await this.bedTypesService.findAll();
        return response.status(HttpStatus.OK).json(types);
    }
}
