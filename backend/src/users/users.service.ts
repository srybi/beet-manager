import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsersEntity} from "./users.entity";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "../config/config.service";
import {Localization} from "../common/localization";
import {CreateUserRequestDto} from "./dto/request/create-user-request.dto";
import {TokenDto} from "./dto/token.dto";
import {LoginUserRequestDto} from "./dto/request/login-user-request.dto";
import {DeleteUserRequestDto} from "./dto/request/delete-user-request.dto";
import {CreatedUserResponseDto} from "./dto/response/created-user-response.dto";
import {RequestResultDto} from "../dto/request-result.dto";
import {ValidateLoginUserRequestDto} from "./dto/request/validate-login-user-request.dto";
import {SignRequestResultDto} from "./dto/request/sign-request-result.dto";
import {UpdateUserRequestDto} from "./dto/request/update-user-request.dto";
import {UpdateUserRequestResultDto} from "./dto/request/update-user-request-result.dto";
import {isEmail} from "class-validator";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        private readonly jwtService: JwtService) {
    }

    async add(user: CreateUserRequestDto): Promise<UsersEntity> {
        return await this.usersRepository.save(user);
    }

    async findOneByName(name: string): Promise<UsersEntity | undefined> {
        return await this.usersRepository.findOne({where: {username: name}});
    }

    async findOneById(id: number): Promise<UsersEntity | undefined> {
        return await this.usersRepository.findOne(id);
    }

    async findOneProtected(id: number, user: DeleteUserRequestDto): Promise<UsersEntity | undefined> {
        const result = await this.usersRepository.findOne({
            where: {
                id: id,
                email: user.email
            }
        });
        if (result !== undefined && await bcrypt.compare(user.password, result.password)) {
            return result;
        }
        return undefined;
    }

    async findOneByEmail(email: string): Promise<UsersEntity | undefined> {
        return await this.usersRepository.findOne({where: {email: email}});
    }

    async canRegister(user: CreateUserRequestDto): Promise<RequestResultDto> {
        const foundUser = await this.findOneByName(user.username);
        const result = new RequestResultDto();
        if (foundUser || await this.findOneByEmail(user.email)) {
            result.result = false;
            result.message = foundUser ? Localization.UsernameAlreadyExists : Localization.EmailAlreadyExists;
        }
        return result;
    }

    async canDelete(id: number, request: DeleteUserRequestDto): Promise<RequestResultDto> {
        const result = new RequestResultDto();
        if (await this.findOneProtected(id, request)) {
            return result;
        }
        result.result = false;
        result.message = Localization.InvalidCredentials;
        return result;
    }

    /**
     * Register the user requesting to sign up
     *
     * @param user the user requesting to sign up
     */
    async create(user: CreateUserRequestDto): Promise<CreatedUserResponseDto> {
        const requestBody = {
            username: user.username,
            email: user.email,
            password: await this.hashAndSalt(user.password)
        }
        const result = await this.add(requestBody);
        return new CreatedUserResponseDto(result);
    }

    async canLogin(user: LoginUserRequestDto): Promise<SignRequestResultDto> {
        const foundUser = await this.usersRepository.findOne({username: user.username});
        const success = foundUser !== undefined && await bcrypt.compare(user.password, foundUser.password);
        return new SignRequestResultDto(foundUser, success);
    }

    /**
     * Builds and signs JWT token depending on the expiration time and its secret.
     *
     * @param user the user requesting to login
     * @param foundUser the user found in database
     */
    async getSignedToken(user: LoginUserRequestDto, foundUser: ValidateLoginUserRequestDto): Promise<TokenDto | undefined> {
        const payload = {user: user.username, id: foundUser.id};
        return {
            token: await this.jwtService.signAsync(
                {payload},
                {
                    expiresIn: ConfigService.appConfig.jwt.expiresIn,
                    secret: ConfigService.appConfig.jwt.secretKey,
                })
        };
    }

    async update(foundUser: UsersEntity, request: UpdateUserRequestDto): Promise<RequestResultDto> {
        let payload;
        if (!request.email) {
            payload = {
                password: await this.hashAndSalt(request.newPassword),
            };
        } else {
            payload = {
                email: request.email ?? foundUser.email
            };
        }
        const result = await this.usersRepository.update({id: foundUser.id}, payload);
        const success = result.affected == 1;
        const message = !success ? Localization.UnknownError : null;
        return new RequestResultDto(success, message);
    }

    async canUpdate(id, request: UpdateUserRequestDto): Promise<UpdateUserRequestResultDto> {
        const result = new UpdateUserRequestResultDto();

        if (request.email && !isEmail(request.email)) {
            result.result = false;
            result.message = Localization.EmailInvalid;
            return result;
        }

        let foundUser = await this.findOneById(id);
        if (!foundUser) {
            result.result = false;
            result.message = Localization.UserIdInvalid;
            return result;
        }

        if (!await bcrypt.compare(request.password, foundUser.password)) { // request.password und foundUser.password getauscht
            result.result = false;
            result.message = Localization.InvalidCredentials;
            return result;
        }

        result.object = foundUser;
        foundUser = await this.findOneByEmail(request.email);
        if (foundUser) {
            result.result = false;
            result.message = Localization.EmailAlreadyExists;
            return result;
        }
        return result;
    }
    async hashAndSalt(password: string) : Promise<string> {
        return await bcrypt.hash(password, await bcrypt.genSalt());
    }



    /**
     * Delete User
     * @param deleteRequest
     */
    async delete(id: number, deleteRequest: DeleteUserRequestDto): Promise<RequestResultDto> {
        const result = await this.usersRepository.delete({
            id: id
        });
        const success = result.affected == 1;
        const message = !success ? Localization.UnknownError : null;
        return new RequestResultDto(success, message);
    }
}
