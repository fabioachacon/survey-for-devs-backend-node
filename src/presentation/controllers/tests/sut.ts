import { HttpRequest } from "../http/messages/HttpRequest";
import { SignUpController } from "../signup";

export const getSut = () => {
  const sut = new SignUpController();

  const request = new HttpRequest().payload<object>({
    name: "any_name",
    email: "email@test.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  });

  return { sut, request };
};
