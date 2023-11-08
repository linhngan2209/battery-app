import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import { Response } from 'express';
import { ApiException } from '../api-exception.model';
import { ModelValidationError } from '../errors/model-validation.error';
import { Logger } from 'nestjs-pino';

@Catch(MongooseError, MongoError, ModelValidationError)
export class ModelExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(error: MongooseError | MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse() as Response;
    const req = ctx.getRequest();
    const path = req ? req.url : null;

    if (error instanceof MongooseError.ValidationError) {
      const exception = new ApiException(
        error.message,
        error.message,
        error.stack,
        error.errors,
        path,
        HttpStatus.BAD_REQUEST,
      );
      res.status(HttpStatus.BAD_REQUEST).json(exception);
    } else if (error instanceof ModelValidationError) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new ApiException(
            error.message,
            error.message,
            error.stack,
            error.error,
            path,
            HttpStatus.BAD_REQUEST,
          ),
        );
    } else {
      this.logger.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(new ApiException('Internal Error', null, null, null, null, 500));
    }
  }
}
