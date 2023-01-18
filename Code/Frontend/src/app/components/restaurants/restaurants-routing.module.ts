import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsListingComponent } from './restaurants-listing/restaurants-listing.component';
import { RestaurantsComponent } from './restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent,
    children: [
      { path: '', component: RestaurantsListingComponent },
      { path: 'add', component: AddRestaurantComponent },
      { path: ':restaurantName', component: RestaurantComponent },
      { path: ':restaurantName/orders', component: RestaurantOrdersComponent },
      { path: ':restaurantName/additem', component: AddItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsRoutingModule {}
