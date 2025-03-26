export class ApiResponse {
  constructor(statusCode, message = "Successful") {
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.error = false;
    this.success = true;
  }
}
