export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    error = [],
    succuss = false,
    isError = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isError = isError;
    this.succuss = succuss;
    this.error = error;
  }
}
