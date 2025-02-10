import { injectable } from "tsyringe";
import { HttpRequest } from "./http/HttpRequest";
import { HttpResponse } from "./http/HttpResponse";
import { StatusCodes } from "./http/StatusCode";
import { MissingParamError } from "./http/errors/MissingParamError";

export class SignUpController {
  public handleRequest(request: HttpRequest): HttpResponse {
    const requestBody = request.getBody();

    if (!requestBody?.name) {
      return new HttpResponse()
        .statusCode(StatusCodes.BAD_REQUEST)
        .payload(new MissingParamError("name"));
    }
    if (!requestBody?.email) {
      return new HttpResponse()
        .statusCode(StatusCodes.BAD_REQUEST)
        .payload(new MissingParamError("email"));
    }
  }
}
