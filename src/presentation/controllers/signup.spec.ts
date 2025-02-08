import { HttpRequest } from "./http/HttpRequest";
import { SignUpController } from "./signup";

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const sut = new SignUpController();

    const request = new HttpRequest({
      name: "any_name",
      image: "email@test.com",
      password: "any_password",
      passwordConfirmation: "any_password",
    });

    const response = sut.handleRequest(request);
    expect(response.statusCode).toBe(400);
  });
});
