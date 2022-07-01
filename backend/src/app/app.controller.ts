import {Controller, Get, Res} from '@nestjs/common';
import {SwaggerTags} from "../common/swagger-tags";
import {ApiMovedPermanentlyResponse, ApiTags} from "@nestjs/swagger";
import {Localization} from "../common/localization";

@ApiTags(SwaggerTags.App)
@Controller()
export class AppController {
    @ApiMovedPermanentlyResponse({description: Localization.AppGet})
    @Get()
    redirect(@Res() res) {
        return res.redirect('api');
    }
}
