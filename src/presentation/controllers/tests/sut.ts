import { HttpRequest } from "../http/HttpRequest";
import { SignUpController } from "../signup";

export const getSut = () => {
  const sut = new SignUpController();

  const request = new HttpRequest({
    name: "any_name",
    image: "email@test.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  });

  return { sut, request };
};
