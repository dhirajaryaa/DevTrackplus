export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    error = [],
    succuss = false,
    isError = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isError = isError;
    this.succuss = succuss;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
