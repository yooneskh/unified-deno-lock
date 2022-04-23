

export class Lock {

  private promise?: Promise<void>;
  // deno-lint-ignore no-explicit-any
  private resolver?: any;


  public lock(): void {
    if (this.promise) return;

    this.promise = new Promise(resolve => {
      this.resolver = resolve;
    });

  }

  public unlock(): void {
    this.resolver();
    this.promise = undefined;
  }

  public async knock() {
    if (!this.promise) return;
    await this.promise;
  }

}
