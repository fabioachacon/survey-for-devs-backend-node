import { HttpRequest } from "./http/HttpRequest";
import { SignUpController } from "./signup";
import { getSut } from "./tests/sut";

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const { sut, request } = getSut();

    Reflect.deleteProperty(request.body, "name");

    const response = sut.handleRequest(request);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error("Missing param: name"));
  });

  test("Should return 400 if no email is provided", async () => {
    const { sut, request } = getSut();

    Reflect.deleteProperty(request.body, "email");

    const response = sut.handleRequest(request);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error("Missing param: email"));
  });
});
