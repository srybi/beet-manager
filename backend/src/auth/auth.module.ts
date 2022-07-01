import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../users/users.entity";
import {ConfigService} from "../config/config.service";

@Module({
    exports: [AuthService],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: ConfigService.appConfig.jwt.secretKey,
            signOptions: {expiresIn: ConfigService.appConfig.jwt.expiresIn},
        }),
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forFeature([UsersEntity])
    ],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}
