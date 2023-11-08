export class ModelValidationError extends Error {
  model: string;
  field: string;
  error: any;
  message: string;

  constructor(message: string, error?: any, model?: string, field?: string) {
    super();

    this.model = model;
    this.field = field;
    this.error = error;
    this.message = message;
  }
}
