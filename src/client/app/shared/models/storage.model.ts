export interface Storage {
  get(key:string): any;
  save(key:string, item: any): boolean;
  delete(key:string): boolean
}
