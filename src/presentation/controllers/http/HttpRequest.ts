export class HttpRequest<T = Record<string, any>, H = Record<string, any>> {
  public body: T;
  public headers: H;

  constructor(body: T) {
    this.body = body;
  }

  public getBody() {
    return this.body;
  }
}
