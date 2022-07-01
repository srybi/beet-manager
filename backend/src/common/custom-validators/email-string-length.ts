import {ConfigService} from "../../config/config.service";
import {CustomStringLength} from "./custom-string-length";
import {Localization} from "../localization";
import {ValidatorConstraint} from "class-validator";

@ValidatorConstraint({name: 'emailStringLength', async: false})
export class EmailStringLength extends CustomStringLength {
    private static readonly policy = {
        minLength: ConfigService.getNaturalNumberOrDefault(CustomStringLength.config.user.email.minimumLength, 6),
        maxLength: ConfigService.getNaturalNumberOrDefault(CustomStringLength.config.user.email.maximumLength, 60)
    };

    constructor() {
        super(EmailStringLength.policy.minLength, EmailStringLength.policy.maxLength, Localization.EmailWrongSize);
    }
}
