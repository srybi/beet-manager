import {ConfigService} from "../../config/config.service";
import {CustomStringLength} from "./custom-string-length";
import {Localization} from "../localization";
import {ValidatorConstraint} from "class-validator";

@ValidatorConstraint({name: 'passwordStringLength', async: false})
export class PasswordStringLength extends CustomStringLength {
    private static readonly policy = {
        minLength: ConfigService.getNaturalNumberOrDefault(CustomStringLength.config.user.password.minimumLength, 14),
        maxLength: ConfigService.getNaturalNumberOrDefault(CustomStringLength.config.user.password.maximumLength, 100)
    };

    constructor() {
        super(PasswordStringLength.policy.minLength, PasswordStringLength.policy.maxLength, Localization.PasswordWrongSize);
    }
}
