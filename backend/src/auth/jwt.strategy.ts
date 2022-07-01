import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {ConfigService} from "../config/config.service";
import {UsersEntity} from "../users/users.entity";
import {ValidateLoginUserRequestDto} from "../users/dto/request/validate-login-user-request.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: ConfigService.appConfig.jwt.ignoreExpiration,
            secretOrKey: ConfigService.appConfig.jwt.secretKey
        });
    }

    async validate(payload: ValidateLoginUserRequestDto): Promise<UsersEntity> {
        return await this.usersService.findOneById(payload.id);
    }
}
