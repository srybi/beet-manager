import {UsersEntity} from "../../users.entity";

export class CreatedUserResponseDto {
    constructor(entity: UsersEntity) {
        this.id = entity.id;
        this.username = entity.username;
        this.email = entity.email;
    }

    id: number;
    username: string;
    email: string;
}
