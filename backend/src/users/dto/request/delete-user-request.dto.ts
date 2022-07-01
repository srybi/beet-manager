import {IsEmail, IsNotEmpty, IsString, Validate} from "class-validator";
import {PasswordStringLength} from "../../../common/custom-validators/password-string-length";
import {Localization} from "../../../common/localization";
import {EmailStringLength} from "../../../common/custom-validators/email-string-length";

export class DeleteUserRequestDto {
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
