import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/app/environment/environment';
import { MatTableDataSource } from '@angular/material/table';
import { FilterObject } from 'src/app/models/filter-object';
import { RestaurantOrder } from 'src/app/models/restaurant-order';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html'
})
export class RestaurantOrdersComponent implements OnInit{

  keyWord: string;
  environment = environment;
  restaurantName: string;
  dataSource = new MatTableDataSource<RestaurantOrder>();
  paginatorTotal: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['customer', 'items', 'totalPrice', 'status'];
  filterObject = new FilterObject();


  constructor(private router: Router, private _crudService:CrudService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurantName=this.route.snapshot.paramMap.get('restaurantName');
    this.getOrdersList();
  }

  getOrdersList() {
    this._crudService.getByName('orders',this.restaurantName).subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      console.log(result);
      
    });
  }
}
