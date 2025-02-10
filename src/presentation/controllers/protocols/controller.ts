import { HttpRequest, HttpResponse } from "../http/messages/";

export interface Controller {
  handleRequest(request: HttpRequest): HttpResponse;
}
