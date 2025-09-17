import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { MovimentoDetailComponent } from './pages/movimento-detail/movimento-detail.component';
import { movimentoDetailResolver } from './core/resolvers/movimento-detail.resolver';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
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
