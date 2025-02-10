import { MissingParamError } from "./http/errors/MissingParamError";
import { getSut } from "./tests/sut";

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const { sut, request } = getSut();

    Reflect.deleteProperty(request.getBody(), "name");

    const response = sut.handleRequest(request);
    expect(response.getStatusCode()).toBe(400);
    expect(response.getBody()).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", async () => {
    const { sut, request } = getSut();

    Reflect.deleteProperty(request.getBody(), "email");

    const response = sut.handleRequest(request);
    expect(response.getStatusCode()).toBe(400);
    expect(response.getBody()).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", async () => {
    const { sut, request } = getSut();

    Reflect.deleteProperty(request.getBody(), "password");

    const response = sut.handleRequest(request);
    expect(response.getStatusCode()).toBe(400);
    expect(response.getBody()).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no passwordConfirmation is provided", async () => {
    const { sut, request } = getSut();

    Reflect.deleteProperty(request.getBody(), "passwordConfirmation");

    const response = sut.handleRequest(request);
    expect(response.getStatusCode()).toBe(400);
    expect(response.getBody()).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });
});
