import {
    Body,
    Controller,
    Delete,
    HttpException,
    HttpStatus,
    Param,
    Post, Put,
    Res,
    UseFilters,
    UseGuards
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiConflictResponse,
    ApiCreatedResponse, ApiNoContentResponse, ApiParam,
    ApiTags,
    ApiUnauthorizedResponse, ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {TokenDto} from "./dto/token.dto";
import {SwaggerTags} from "../common/swagger-tags";
import {ErrorResponseDto} from "../common/error-response.dto";
import {Localization} from "../common/localization";
import {HttpExceptionFilter} from "../common/exception-filters/http-exception-filter";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateUserRequestDto} from "./dto/request/create-user-request.dto";
import {LoginUserRequestDto} from "./dto/request/login-user-request.dto";
import {DeleteUserRequestDto} from "./dto/request/delete-user-request.dto";
import {CreatedUserResponseDto} from "./dto/response/created-user-response.dto";
import {ValidationUtil} from "../common/validation-util";
import {UpdateUserRequestDto} from "./dto/request/update-user-request.dto";


@ApiTags(SwaggerTags.Users)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    /**
     * Register the user specified.
     *   - get response from registry field
     *   - get Body and check if email is already registered if not create new User
     *
     * @param response the response object to process
     * @param createRequest the user object to create from
     */
    @ApiCreatedResponse({description: Localization.UsersPost, type: CreatedUserResponseDto})
    @ApiBadRequestResponse({description: Localization.InvalidBody, type: ErrorResponseDto})
    @ApiConflictResponse({description: Localization.IdentificatorExists, type: ErrorResponseDto})
    @ApiUnprocessableEntityResponse({description: Localization.IdentificatorInvalid, type: ErrorResponseDto})
    @Post('signup')
    async create(@Res() response, @Body() createRequest: CreateUserRequestDto) {
        if (!(await ValidationUtil.isValid(createRequest)).result) {
            throw new HttpException(Localization.InvalidBody, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const registerResult = await this.userService.canRegister(createRequest);
        if (!registerResult.result) {
            throw new HttpException(registerResult.message, HttpStatus.CONFLICT);
        }

        const newUser = await this.userService.create(createRequest);
        return response.status(HttpStatus.CREATED).json(newUser);
    }

    /**
     * Try to sign in the user specified.
     *
     * @param response the response object to process
     * @param loginRequest the user object to verify
     */
    @ApiCreatedResponse({description: Localization.UsersPostLogin, type: TokenDto})
    @ApiBadRequestResponse({description: Localization.InvalidBody, type: ErrorResponseDto})
    @ApiUnauthorizedResponse({description: Localization.InvalidCredentials, type: ErrorResponseDto})
    @Post('signin')
    @UseFilters(HttpExceptionFilter)
    async login(@Res() response, @Body() loginRequest: LoginUserRequestDto) {
        if (!(await ValidationUtil.isValid(loginRequest)).result) {
            throw new HttpException(Localization.InvalidBody, HttpStatus.BAD_REQUEST);
        }

        const canLoginResult = await this.userService.canLogin(loginRequest);
        if (!canLoginResult.result) {
            throw new HttpException(Localization.InvalidCredentials, HttpStatus.UNAUTHORIZED);
        }

        const token = await this.userService.getSignedToken(loginRequest, canLoginResult.object);
        if (token === undefined) {
            throw new HttpException(Localization.UnknownError, HttpStatus.UNAUTHORIZED);
        }
        return response.status(HttpStatus.CREATED).json(token);
    }


    @ApiBearerAuth()
    @ApiNoContentResponse({description: Localization.UsersPut})
    @ApiBadRequestResponse({description: Localization.InvalidCredentialsGeneric, type: ErrorResponseDto})
    @ApiConflictResponse({description: Localization.EmailAlreadyExists, type: ErrorResponseDto})
    @ApiUnauthorizedResponse({description: Localization.NotLoggedIn, type: ErrorResponseDto})
    @ApiParam({name: 'id', description: Localization.UsersIdParam})
    @Put('users/:id')
    @UseGuards(JwtAuthGuard)
    @UseFilters(HttpExceptionFilter)
    async update(@Res() response, @Param('id') id, @Body() updateRequest: UpdateUserRequestDto) {
        if (!(await ValidationUtil.isValid(updateRequest)).result) {
            throw new HttpException(Localization.InvalidBody, HttpStatus.BAD_REQUEST);
        }

        const canUpdateResult = await this.userService.canUpdate(id, updateRequest);
        if (!canUpdateResult.result) {
            throw new HttpException(canUpdateResult.message, HttpStatus.UNAUTHORIZED);
        }

        const updateResult = await this.userService.update(canUpdateResult.object, updateRequest);
        if (!updateResult.result) {
            throw new HttpException(updateResult.message, HttpStatus.CONFLICT);
        }
        return response.status(HttpStatus.NO_CONTENT).json();
    }

    @ApiBearerAuth()
    @ApiNoContentResponse({description: Localization.UsersDelete})
    @ApiBadRequestResponse({description: Localization.InvalidCredentials, type: ErrorResponseDto})
    @ApiUnauthorizedResponse({description: Localization.NotLoggedIn, type: ErrorResponseDto})
    @ApiParam({name: 'id', description: Localization.UsersIdParam})
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @UseFilters(HttpExceptionFilter)
    async delete(@Res() response, @Param('id') id, @Body() deleteRequest: DeleteUserRequestDto): Promise<string> {
        if (!(await ValidationUtil.isValid(deleteRequest)).result) {
            throw new HttpException(Localization.InvalidBody, HttpStatus.BAD_REQUEST);
        }
        const canDeleteResult = await this.userService.canDelete(id, deleteRequest);
        if (!canDeleteResult.result) {
            throw new HttpException(canDeleteResult.message, HttpStatus.BAD_REQUEST);
        }
        const deletionResult = await this.userService.delete(id, deleteRequest);
        if (!deletionResult.result) {
            throw new HttpException(deletionResult.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response.status(HttpStatus.NO_CONTENT).json();
    }
}
