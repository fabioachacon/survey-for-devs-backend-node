export class HttpRequest<B = Record<string, any>, H = Record<string, any>> {
  private body: B;
  private headers: H;

  public payload<T extends B>(body: T) {
    this.body = body as T;
    return this;
  }

  public getBody() {
    return this.body;
  }
}
