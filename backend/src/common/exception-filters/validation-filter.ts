import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";

export class ValidationException extends BadRequestException {
    constructor(public validationErrors: any) {
        super();
    }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = HttpStatus.BAD_REQUEST;
        return response.status(statusCode).json({
            statusCode: statusCode,
            success: false,
            message: exception.message,
            error: exception.validationErrors
        });
    }
}
