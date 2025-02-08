import { HttpRequest } from "./http/HttpRequest";
import { HttpResponse } from "./http/HttpResponse";

export class SignUpController {
  public handleRequest(request: HttpRequest): HttpResponse {
    const response = new HttpResponse();

    response.statusCode = 400;

    return response;
  }
}
