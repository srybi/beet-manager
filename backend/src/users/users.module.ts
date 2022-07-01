import {Module} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";
import {UsersController} from "./users.controller";
import {UsersService} from './users.service';
import {AuthService} from "../auth/auth.service";

@Module({
    controllers: [UsersController],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [UsersService, AuthService, JwtService]
})
export class UsersModule {
}
