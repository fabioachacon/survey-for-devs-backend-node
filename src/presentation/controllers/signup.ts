import { injectable } from "tsyringe";
import { HttpRequest } from "./http/HttpRequest";
import { HttpResponse } from "./http/HttpResponse";
import { StatusCodes } from "./http/StatusCode";
import { MissingParamError } from "./http/errors/MissingParamError";

export class SignUpController {
  public handleRequest(request: HttpRequest): HttpResponse {
    const requestBody = request.getBody();

    const missingField = this.validateRequiredFeilds(requestBody);

    if (missingField) {
      return new HttpResponse()
        .statusCode(StatusCodes.BAD_REQUEST)
        .payload(new MissingParamError(missingField));
    }
  }

  private validateRequiredFeilds(body: object): string | undefined {
    const fields = ["name", "email", "password", "passwordConfirmation"];

    for (const field of fields) {
      if (!body[field]) {
        return field;
      }
    }
  }
}
