export class RequestResultDto {
    constructor(result?: boolean, message?: string) {
        this.result = result ?? true;
        this.message = message;
    }

    result: boolean;
    message: string;
}
