import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RestaurantOrder } from 'src/app/models/restaurant-order';
import { AuthinticationService } from 'src/app/services/authintication.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html'
})
export class UserOrdersComponent implements OnInit{
  
  userCredentials: any;
  dataSource = new MatTableDataSource<RestaurantOrder>();
  paginatorTotal: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['items', 'totalPrice', 'status'];

  constructor(
    private authService: AuthinticationService,
    private _crudService: CrudService,
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => (this.userCredentials = res));
    this.getOrdersList();
  }
  getOrdersList() {
    this._crudService
      .getById('orders/userOrders', this.userCredentials.sub)
      .subscribe((result: any) => {
        this.dataSource = new MatTableDataSource(result);
        console.log(result);
      });
  }
}
