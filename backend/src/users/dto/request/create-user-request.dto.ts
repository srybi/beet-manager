 import {IsEmail, IsNotEmpty, IsString, Validate} from "class-validator";
import {Localization} from "../../../common/localization";
import {PasswordStringLength} from "../../../common/custom-validators/password-string-length";
import {UsernameStringLength} from "../../../common/custom-validators/username-string-length";
import {EmailStringLength} from "../../../common/custom-validators/email-string-length";

export class CreateUserRequestDto {
    @IsNotEmpty()
    @IsString()
    @Validate(UsernameStringLength)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Validate(PasswordStringLength)
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, {message: Localization.EmailInvalid})
    @Validate(EmailStringLength)
    email: string;
}
