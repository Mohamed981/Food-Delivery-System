export class Result<T> {
  results: T;
  Errors: string[];
  constructor(){
      this.Errors=[];
  }
}
