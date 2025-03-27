export class ApiResponse {
  constructor(statusCode, message = "Successful", data = "null") {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = false;
    this.success = true;
  }
}
