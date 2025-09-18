import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MovimentiService } from '../services/movimenti.service';
import { Movimento } from '../../components/entities/movimento.entity';

export const movimentoDetailResolver: ResolveFn<Movimento> = (route, state) => {
  const movimentiSrv = inject(MovimentiService);
  const router = inject(Router);

  const id = route.paramMap.get('id');
  if (!id) {
    return new RedirectCommand(router.parseUrl('/home'));
  }

  return movimentiSrv.getById(id).pipe(
    catchError((_) => {
      return of(new RedirectCommand(router.parseUrl('/home')));
    })
  );
};
