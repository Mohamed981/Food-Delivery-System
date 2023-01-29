import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/app/environment/environment';
import { MatTableDataSource } from '@angular/material/table';
import { FilterObject } from 'src/app/models/filter-object';
import { Item } from 'src/app/models/item';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthinticationService } from 'src/app/services/authintication.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  addItem: boolean = false;
  restaurantName: string;
  environment = environment;
  dataSource = new MatTableDataSource<Item>();
  paginatorTotal: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'category', 'action', 'edit'];
  filterObject = new FilterObject();
  editable: boolean[] = [];
  counter: number[] = null;
  order: Order = null;
  userCredentials: any;

  constructor(
    private authService: AuthinticationService,
    private _crudService: CrudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restaurantName = this.route.snapshot.paramMap.get('restaurantName');
    this.authService.getUser().subscribe((res) => (this.userCredentials = res));
    this.dataSource.paginator = this.paginator;
    merge(this.paginator.page)
      .pipe(
        tap(() => {
          this.getItemsList(this.restaurantName);
        })
      )
      .subscribe();
    this.getItemsList(this.restaurantName);
  }

  getItemsList(keyWord: string) {
    this.filterObject.SearchObject = keyWord;
    this.filterObject.PageNumber = this.paginator.pageIndex + 1;
    this.filterObject.PageSize = this.paginator.pageSize
      ? this.paginator.pageSize
      : environment.pageSize;
    this._crudService
      .getPaginatedList('items', this.filterObject)
      .subscribe((result: any) => {
        console.log(result);

        this.dataSource = new MatTableDataSource(result.Results);
        this.paginatorTotal = result.TotalRecords;
        this.editable = new Array(result.TotalRecords).fill(false);
        if (!this.userCredentials.IsOwner) {
          this.counter = new Array(result.TotalRecords).fill(0);
          this.order = new Order();
          this.order.userId = this.userCredentials.sub;
          this.order.TotalPrice = 0;
        }
      });
  }

  delete(id: number) {
    this._crudService
      .delete('items', id)
      .subscribe((res) => this.getItemsList(this.restaurantName));
  }

  edit(item: Item, done: boolean, index: number) {
    this.editable[index] = done;
    if (!done) {
      delete item['restaurantId'];
      this._crudService
        .edit('items', item, item.id)
        .subscribe((res) => this.getItemsList(this.restaurantName));
    }
  }
  increment(item: Item, index: number) {
    if (this.order.restaurantId === undefined){
      this.order.restaurantId = item.restaurantId;
      this.order.Items=new Array();
    }
      
    this.order.Items.push({ itemId: item.id });
    this.order.TotalPrice += item.ItemPrice;
    this.counter[index]++;
  }
  decrement(item: Item, index: number) {
    if (this.counter[index] <= 0) return;
    
    this.order.Items.forEach((element, index) => {
      if (element.itemId === item.id) {
        this.order.Items.splice(index,1)
        return;
      }
    });
    this.order.TotalPrice -= item.ItemPrice;
    this.counter[index]--;
  }
  orderNow(){
    if(this.order.Items !== undefined && this.order.Items.length!==0)
      this._crudService.add('orders',this.order).subscribe(res=>this.save());
  }
  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.getItemsList(this.restaurantName))).subscribe();
  }
  save() {
    
    const _description = 'Are you sure you want to order?';
    const _title: string = 'Making Order';
    const _waitDesciption: string = 'Ordering...';
    
  }
}
