import { HttpRequest } from "./http/HttpRequest";
import { HttpResponse } from "./http/HttpResponse";

export class SignUpController {
  public handleRequest(request: HttpRequest): HttpResponse {
    const response = new HttpResponse();

    if (!request.getBody()?.name) {
      response.body = new Error("Missing param: name");
      response.statusCode = 400;
    }

    return response;
  }
}
