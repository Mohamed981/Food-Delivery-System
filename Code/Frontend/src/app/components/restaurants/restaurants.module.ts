import { NgModule } from '@angular/core';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantsListingComponent } from './restaurants-listing/restaurants-listing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { AddItemComponent } from './add-item/add-item.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AddRestaurantComponent,
    RestaurantComponent,
    RestaurantsListingComponent,
    RestaurantsComponent,
    AddItemComponent,
    RestaurantOrdersComponent,
  ],
  imports: [SharedModule, RestaurantsRoutingModule,NgSelectModule],
})
export class RestaurantsModule {}
