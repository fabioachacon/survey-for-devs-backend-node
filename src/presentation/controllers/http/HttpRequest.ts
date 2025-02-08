export class HttpRequest<T = Record<string, any>, H = Record<string, any>> {
  private readonly headers: H;
  private readonly body: T;

  constructor(body: T) {
    this.body = body;
  }

  public getBody() {
    return this.body;
  }
}
