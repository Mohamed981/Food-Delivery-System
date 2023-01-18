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

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit, AfterViewInit{

  addItem:boolean=false;
  restaurantName: string;
  environment = environment;
  dataSource = new MatTableDataSource<Item>();
  paginatorTotal: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'category', 'action'];
  filterObject = new FilterObject();

  constructor(private router: Router, private _crudService:CrudService,private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.restaurantName=this.route.snapshot.paramMap.get('restaurantName');
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
    this.filterObject.PageSize = this.paginator.pageSize ? this.paginator.pageSize : environment.pageSize;
    this._crudService.getPaginatedList('items', this.filterObject).subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result.Results);
      this.paginatorTotal = result.TotalRecords;
      console.log(result.Results);
      
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.getItemsList("")
      )
    ).subscribe();
  }

}
