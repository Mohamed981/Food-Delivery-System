import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    //canActivateChild: [Authorization],
    children: [
      {
        path: 'restaurants',
        loadChildren: () =>
          import('../restaurants/restaurants.module').then(
            (m) => m.RestaurantsModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../orders/orders.module').then((m) => m.OrdersModule),
      },
      // {
      //   path: 'login',
      //   // canActivate: [NgxPermissionsGuard],
      //   component: LoginComponent,
      //   data: {
      //     permissions: {
      //       except: 'Admin',
      //     },
      //   },
      // },
      // {
      //   path: 'register',
      //   // canActivate: [NgxPermissionsGuard],
      //   component: RegisterComponent,
      //   data: {
      //     permissions: {
      //       except: 'Admin',
      //     },
      //   },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
