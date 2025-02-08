export class HttpRequest<T = Record<string, any>, H = Record<string, any>> {
  private readonly body: T;
  private readonly headers: H;

  constructor(body: T) {
    this.body = body;
  }

  public getBody() {
    return this.body;
  }
}
