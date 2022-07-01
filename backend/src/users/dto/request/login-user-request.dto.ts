import {IsNotEmpty, IsString, Validate} from "class-validator";
import {UsernameStringLength} from "../../../common/custom-validators/username-string-length";
import {PasswordStringLength} from "../../../common/custom-validators/password-string-length";

export class LoginUserRequestDto {
    @IsNotEmpty()
    @IsString()
    @Validate(UsernameStringLength)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Validate(PasswordStringLength)
    password: string;
}
