export class StringUtil {
    private static replace = require('@stdlib/string-replace');

    static replaceString(original: string, key: string, value: number): string {
        return StringUtil.replace(original, key, value.toString());
    }
}
