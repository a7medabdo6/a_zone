import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch()
export class CustomValidationFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    if (exception.response?.message) {
      const validationErrors: ValidationError[] = exception.response.message;
      console.log(exception, 'validationErrors');

      // Map the validation errors into your custom format
      const errors = validationErrors.map((error) => ({
        message: error.constraints
          ? Object.values(error.constraints).join(', ')
          : 'Invalid value',
      }));

      // Send the response in the desired format
      return response.status(status).json({
        errors,
      });
    }

    // For other types of exceptions, just rethrow the original exception
    return response.status(status).json(exception.response);
  }
}
