import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {ConfigService} from "../../config/config.service";
import {LocalizationUtil} from "../localization-util";

@ValidatorConstraint({name: 'customStringLength', async: false})
export class CustomStringLength implements ValidatorConstraintInterface {
    private static readonly _config = ConfigService.appConfig;

    private readonly _minLength: number;
    private readonly _maxLength: number;
    private readonly _message: string;

    public static get config() {
        return this._config;
    }

    constructor(minLength: number, maxLength: number, message: string) {
        this._minLength = minLength;
        this._maxLength = maxLength;
        this._message = message;
    }

    public validate(text: string, args: ValidationArguments) {
        if (!text) {
            return true;
        }
        const length = text.length;
        return this._minLength <= length && length <= this._maxLength; // for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments) {
        return LocalizationUtil.getLengthMessage(this._message, {
            minLength: this._minLength,
            maxLength: this._maxLength
        });
    }
}
