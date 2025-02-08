import { HttpRequest } from "./http/HttpRequest";
import { HttpResponse } from "./http/HttpResponse";

export class SignUpController {
  public handleRequest(request: HttpRequest): HttpResponse {
    const requestBody = request.getBody();

    if (!requestBody?.name) {
      return new HttpResponse({
        body: new Error("Missing param: name"),
        statusCode: 400,
      });
    } else if (!requestBody?.email) {
      return new HttpResponse({
        body: new Error("Missing param: email"),
        statusCode: 400,
      });
    }
  }
}
