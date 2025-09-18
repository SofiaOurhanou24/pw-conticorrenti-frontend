import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, map, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected http = inject(HttpClient);
  protected jwtSrv = inject(JwtService);
  protected router = inject(Router);

  protected _currentUser$ = new BehaviorSubject<User | null>(null);

  currentUser$ = this._currentUser$.asObservable();

  isAuthenticated$ = this.currentUser$.pipe(
    map((user) => !!user),
    distinctUntilChanged()
  );

  constructor() {
    const tokenValid = this.jwtSrv.isTokenValid();
    if (!tokenValid) {
      this.logout();
    } else {
      const user = this.jwtSrv.getPayload<User>();
      this._currentUser$.next(user);
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>('/api/login', { email, password }).pipe(
      tap((res) => this.jwtSrv.setToken(res.token)),
      tap((res) => this._currentUser$.next(res.user)),
      map((res) => res.user)
    );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    return this.http.post<any>('/api/register', {
      firstName,
      lastName,
      email,
      password,
    });
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
  }

  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }
}
