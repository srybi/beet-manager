import {NestFactory} from '@nestjs/core';
import {Logger, ValidationPipe} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app/app.module';
import {SwaggerTags} from "./common/swagger-tags";
import {HttpExceptionFilter} from "./common/exception-filters/http-exception-filter";
import {ValidationError} from "class-validator";
import {ValidationException, ValidationFilter} from "./common/exception-filters/validation-filter";

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter(), new ValidationFilter());
    app.useGlobalPipes(new ValidationPipe({
        skipMissingProperties: false,
        exceptionFactory: (errors: ValidationError[]) => {
            const errorMessage = {};
            errors.forEach(err => {
                errorMessage[err.property] = [...Object.values(err.constraints)];
            });
            return new ValidationException(errorMessage);
        }
    }));
    app.enableCors();

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Beet-Manager')
        .setDescription('Organize your beds intelligently')
        .setVersion('1.0')
        .addTag(SwaggerTags.App)
        .addTag(SwaggerTags.Beds)
        .addTag(SwaggerTags.Plants)
        .addTag(SwaggerTags.PlantPositions)
        .addTag(SwaggerTags.Users)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    const config = require('config');
    const port = config.get('port');
    await app.listen(port);
    Logger.log(`Listening on http://localhost:${port}`);
})();
