import {RequestResultDto} from "../../../dto/request-result.dto";
import {UsersEntity} from "../../users.entity";

export class SignRequestResultDto extends RequestResultDto{
    constructor(object?: UsersEntity, result?: boolean, message?: string) {
        super(result, message);
        this.object = object;
    }

    object: UsersEntity;
}
