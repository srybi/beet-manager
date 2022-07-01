import {
    Body,
    Controller,
    Delete,
    forwardRef,
    Get, HttpException,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    Res,
    UseFilters,
    UseGuards
} from '@nestjs/common';
import {PlantPositionsService} from "./plant-positions.service";
import {PlantsService} from "../plants/plants.service";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam,
    ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {ReadPlantPositionsResponseDto} from "./read-plant-positions-response.dto";
import {SwaggerTags} from "../common/swagger-tags";
import {Localization} from "../common/localization";
import {ErrorResponseDto} from "../common/error-response.dto";
import {HttpExceptionFilter} from "../common/exception-filters/http-exception-filter";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreatePlantPositionRequestDto} from "./dto/request/create-plant-position-request.dto";
import {ValidationUtil} from "../common/validation-util";
import {UpdatePlantPositionsRequestDto} from "./dto/request/update-plant-positions-request.dto";
import {DeletePlantPositionRequestDto} from "./dto/request/delete-plant-position-request.dto";

@ApiTags(SwaggerTags.PlantPositions)
@Controller("plants")
export class PlantPositionsController {
    constructor(@Inject(PlantPositionsService)
                private readonly plantPositionService: PlantPositionsService,
                @Inject(forwardRef(() => PlantsService))
                private readonly plantService: PlantsService) {
    }

    @ApiBearerAuth()
    @ApiCreatedResponse({description: Localization.PlantPositionsPost, type: ReadPlantPositionsResponseDto})
    @ApiBadRequestResponse({description: Localization.InvalidBody, type: ErrorResponseDto})
    @ApiConflictResponse({description: Localization.PlantPositionIsOccupied, type: ErrorResponseDto})
    @ApiUnprocessableEntityResponse({description: Localization.PlantIdInvalid, type: ErrorResponseDto})
    @ApiUnauthorizedResponse({description: Localization.NotLoggedIn, type: ErrorResponseDto})
    @UseGuards(JwtAuthGuard)
    @Post("positions")
    @UseFilters(new HttpExceptionFilter())
    async create(@Res() response, @Body() createRequest: CreatePlantPositionRequestDto): Promise<string> {
        if (!(await ValidationUtil.isValid(createRequest)).result) {
            throw new HttpException(Localization.InvalidBody, HttpStatus.BAD_REQUEST)
        }

        if (!await this.plantPositionService.canCreate(createRequest)) {
            throw new HttpException(Localization.PlantIdInvalid, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (await this.plantPositionService.exists(createRequest)) {
            throw new HttpException(Localization.PlantPositionIsOccupied, HttpStatus.CONFLICT);
        }

        await this.plantPositionService.create(createRequest);
        return response.status(HttpStatus.CREATED).json({
            newPlantPosition: createRequest
        })
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: Localization.PlantPositionsGet, type: ReadPlantPositionsResponseDto})
    @ApiUnauthorizedResponse({description: Localization.NotLoggedIn, type: ErrorResponseDto})
    @UseGuards(JwtAuthGuard)
    @Get("positions")
    async getAll(@Res() response): Promise<string> {
        const plants = await this.plantPositionService.findAll();
        return response.status(HttpStatus.OK).json(plants);
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: Localization.PlantPositionsPut, type: ReadPlantPositionsResponseDto})
    @ApiBadRequestResponse({description: Localization.InvalidBody, type: ErrorResponseDto})
    @ApiNotFoundResponse({description: Localization.PlantIdInvalid, type: ErrorResponseDto})
    @ApiConflictResponse({description: Localization.PlantPositionIsOccupied, type: ErrorResponseDto})
    @ApiUnauthorizedResponse({description: Localization.NotLoggedIn, type: ErrorResponseDto})
    @ApiParam({name: 'id', description: Localization.PlantPositionsIdParam})
    @UseGuards(JwtAuthGuard)
    @Put("positions/:id")
    @UseFilters(new HttpExceptionFilter())
    async update(@Res() response, @Param('id') id, @Body() updateRequest: UpdatePlantPositionsRequestDto): Promise<string> {
        if (!(await ValidationUtil.isValid(updateRequest)).result) {
            throw new HttpException(Localization.InvalidBody, HttpStatus.BAD_REQUEST);
        }

        let resource = await this.plantPositionService.findById(id);
        if (resource === undefined) {
            throw new HttpException("The plant position ID specified could not be found.", HttpStatus.NOT_FOUND);
        }

        if (resource.x_pos == updateRequest.x_pos
            && resource.y_pos == updateRequest.y_pos) {
            throw new HttpException('', HttpStatus.NOT_MODIFIED);
        }

        await this.plantPositionService.updateOrSwap(resource.id, resource, updateRequest);
        return response.status(HttpStatus.OK).json(updateRequest);
    }

    @ApiBearerAuth()
    @ApiNoContentResponse({description: Localization.PlantPositionsDelete})
    @ApiBadRequestResponse({description: Localization.InvalidBody, type: ErrorResponseDto})
    @ApiConflictResponse({description: Localization.PlantPositionIsNotOccupied, type: ErrorResponseDto})
    @ApiNotAcceptableResponse({description: Localization.PlantIdInvalid, type: ErrorResponseDto})
    @ApiUnauthorizedResponse({description: Localization.NotLoggedIn, type: ErrorResponseDto})
    @ApiParam({name: 'id', description: Localization.PlantPositionsIdParam})
    @UseGuards(JwtAuthGuard)
    @Delete("positions/:id")
    @UseFilters(new HttpExceptionFilter())
    async delete(@Res() response, @Param('id') id: number, @Body() deleteRequest: DeletePlantPositionRequestDto): Promise<string> {
        if (!(await ValidationUtil.isValid(deleteRequest)).result) {
            throw new HttpException(Localization.InvalidBody, HttpStatus.BAD_REQUEST);
        }
        const plantById = await this.plantPositionService.findById(id);
        if (!plantById) {
            throw new HttpException(Localization.PlantPositionsIdInvalid, HttpStatus.CONFLICT);
        }

        if (!this.plantPositionService.verify(plantById, deleteRequest)) {
            throw new HttpException("Could not delete plant at position x " + deleteRequest.x_pos
                + ", y " + deleteRequest.y_pos + ". Position is not occupied.", HttpStatus.CONFLICT);
        }
        await this.plantPositionService.delete(deleteRequest);
        return response.status(HttpStatus.NO_CONTENT).json();
    }
}
