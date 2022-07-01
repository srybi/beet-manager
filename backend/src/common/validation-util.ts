import {RequestResultDto} from "../dto/request-result.dto";
import {validate} from "class-validator";

export class ValidationUtil {
    static async isValid(object: any): Promise<RequestResultDto> {
        let success = true;
        await validate(object)
            .catch(errors => success = errors.length < 1);
        return new RequestResultDto(success);
    }
}
