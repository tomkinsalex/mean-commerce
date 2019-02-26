import { Injectable } from "@angular/core";

export abstract class StorageService {
  public abstract get(): Storage;
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class LocalStorageService extends StorageService {
  public get(): Storage {
    return localStorage;
  }
}