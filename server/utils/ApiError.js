export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    error = [],
    success = false,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
