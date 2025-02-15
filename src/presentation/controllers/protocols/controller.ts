import { HttpRequest, HttpResponse } from '../http/messages/';

export interface Controller {
    handle(request: HttpRequest): Promise<HttpResponse>;
}
