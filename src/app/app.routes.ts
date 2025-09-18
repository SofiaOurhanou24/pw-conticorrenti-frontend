import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovimentoDetailComponent } from './pages/movimento-detail/movimento-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';
import { movimentoDetailResolver } from './resolvers/movimento-detail.resolver';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home/:id',
    component: MovimentoDetailComponent,
    canActivate: [authGuard],
    resolve: {
      movimento: movimentoDetailResolver,
    },
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
];
