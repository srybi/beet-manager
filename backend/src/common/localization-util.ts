import {StringUtil} from "./string-util";

export class LocalizationUtil {
    static getLengthMessage(message: string, validationObject: IdentificatorConfigDto): string {
        const result = StringUtil.replaceString(message, '%min%', validationObject.minLength);
        return StringUtil.replaceString(result, '%max%', validationObject.maxLength);
    }
}
