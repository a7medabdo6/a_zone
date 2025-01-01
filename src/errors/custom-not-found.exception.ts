// custom-not-found.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomNotFoundException extends HttpException {
  constructor(message: string) {
    super({ message, statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }
}
