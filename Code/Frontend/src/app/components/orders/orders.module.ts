import { NgModule } from '@angular/core';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OrdersComponent,UserOrdersComponent],
  imports: [SharedModule, OrdersRoutingModule],
})
export class OrdersModule {}
