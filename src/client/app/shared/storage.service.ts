import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class StorageService {
  constructor(private storage: LocalStorageService) {
  }

  get(key:string ) : any {
    return this.storage.get(key);
  }

  save(key:string, item: any) : boolean {
    this.storage.save(key, item);
    return true;
  }

}
