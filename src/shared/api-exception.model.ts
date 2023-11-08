import { HttpStatus } from '@nestjs/common';

const isProd = process.env.NODE_ENV === 'production';

export class ApiException {
  statusCode?: number;
  message?: string;
  status?: string;
  error?: string;
  errors?: any;
  timestamp?: string;
  path?: string;
  stack?: string;

  constructor(
    message: string,
    error: string,
    stack: string,
    errors: any,
    path: string,
    statusCode: number,
  ) {
    this.message = message;
    this.error = error;
    this.stack = isProd ? undefined : stack;
    this.errors = errors;
    this.path = path;
    this.timestamp = new Date().toISOString();
    this.statusCode = statusCode;
    this.status = HttpStatus[statusCode];
  }
}
