import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { MovimentoDetailComponent } from './pages/movimento-detail/movimento-detail.component';
import { movimentoDetailResolver } from './core/resolvers/movimento-detail.resolver';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home/:id',
    component: MovimentoDetailComponent,
    resolve: {
      movimento: movimentoDetailResolver,
    },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
