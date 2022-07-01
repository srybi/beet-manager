import {UsersEntity} from "../../users.entity";
import {RequestResultDto} from "../../../dto/request-result.dto";

export class UpdateUserRequestResultDto extends RequestResultDto {
    constructor(object?: UsersEntity, result?: boolean, message?: string) {
        super(result, message);
        this.object = object;
    }

    object: UsersEntity;
}