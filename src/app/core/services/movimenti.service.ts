import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Movimento } from '../entities/movimento.entity';

@Injectable({
  providedIn: 'root',
})
export class MovimentiService {
  protected http = inject(HttpClient);
  protected authSrv = inject(AuthService);

  protected _movimenti$ = new BehaviorSubject<Movimento[]>([]);

  movimenti$ = this._movimenti$.asObservable();

  constructor() {
    this.authSrv.isAuthenticated$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.fetch();
      } else {
        this._movimenti$.next([]);
      }
    });
  }

  fetch() {
    this.http
      .get<Movimento[]>('/api/classrooms')
      .subscribe((items) => this._movimenti$.next(items));
  }
}
