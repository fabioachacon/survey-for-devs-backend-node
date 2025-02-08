import { HttpRequest } from "./http/HttpRequest";
import { SignUpController } from "./signup";

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const sut = new SignUpController();

    const request = new HttpRequest({
      email: "email@test.com",
      password: "any_password",
      passwordConfirmation: "any_password",
    });

    const response = sut.handleRequest(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error("Missing param: name"));
  });
});
