import { HttpRequest, HttpResponse } from '../../helpers/http/messages';

export interface Controller {
    handle(request: HttpRequest): Promise<HttpResponse>;
}
