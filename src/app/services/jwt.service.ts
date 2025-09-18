import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  protected storageKey = 'authToken';

  hasToken() {
    return !!this.getToken();
  }

  // getPayload<T>() {
  //   const authToken = this.getToken();

  //   if (!authToken) {
  //     return null;
  //   }
  //   return jwtDecode<T>(authToken);
  // }

  // isTokenValid() {
  //   const authToken = this.getToken();

  //   if (!authToken) {
  //     return false;
  //   }

  //   const decoded = jwtDecode(authToken);
  //   return !decoded.exp || decoded.exp * 1000 > Date.now();
  // }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  setToken(value: string) {
    localStorage.setItem(this.storageKey, value);
  }

  removeToken() {
    localStorage.removeItem(this.storageKey);
  }
}
