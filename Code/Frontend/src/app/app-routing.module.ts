import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuardService],
    loadChildren: () =>
      import('./components/pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      permissions: {
        except: 'Admin',
      },
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      permissions: {
        except: 'Admin',
      },
    },
  },
  {
    path: '404',
    component: ErrorPageComponent,
    
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
