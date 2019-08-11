import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  setItem(key: string, data: any): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      return null;
    }
  };

  getItem(key: string): any {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  };

  setObject(key: string, object: any): void {
    try {
      this.set(key, JSON.stringify(object));
    } catch (e) {
      return null;
    }
  };

  getObject(key: string): any {
    try {
      return JSON.parse(this.get(key));
    } catch (e) {
      return null;
    }
  };

  set(key: string, data: any): void {
    try {
      window.localStorage.setItem(key, data);
    } catch (e) {
      return null;
    }
  };

  get(key: string): any {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };

}
