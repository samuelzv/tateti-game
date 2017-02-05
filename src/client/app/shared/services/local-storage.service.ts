import { Injectable } from '@angular/core';

import { Storage } from './../models/index';

@Injectable()
export class LocalStorageService implements Storage {
  constructor() {}

  get(key:string ) : any {
    return localStorage.getItem(key);
  }

  save(key:string, item: any) : boolean {
    localStorage.setItem(key, item);
    return true;
  }

}
