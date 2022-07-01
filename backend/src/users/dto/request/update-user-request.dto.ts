import {IsEmail, IsNotEmpty, IsString, Validate} from "class-validator";
import {PasswordStringLength} from "../../../common/custom-validators/password-string-length";
import {EmailStringLength} from "../../../common/custom-validators/email-string-length";

export class UpdateUserRequestDto {
    @IsNotEmpty()
    @IsString()
    password: string;


    @Validate(PasswordStringLength)
    newPassword: string;


    @Validate(EmailStringLength)
    email: string;
}
