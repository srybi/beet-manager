import {ConfigService} from "../../config/config.service";
import {CustomStringLength} from "./custom-string-length";
import {Localization} from "../localization";
import {ValidatorConstraint} from "class-validator";

@ValidatorConstraint({name: 'usernameStringLength', async: false})
export class UsernameStringLength extends CustomStringLength {
    private static readonly policy = {
        minLength: ConfigService.getNaturalNumberOrDefault(CustomStringLength.config.user.name.minimumLength, 3),
        maxLength: ConfigService.getNaturalNumberOrDefault(CustomStringLength.config.user.name.maximumLength, 20)
    };

    constructor() {
        super(UsernameStringLength.policy.minLength, UsernameStringLength.policy.maxLength, Localization.UsernameWrongSize);
    }
}
