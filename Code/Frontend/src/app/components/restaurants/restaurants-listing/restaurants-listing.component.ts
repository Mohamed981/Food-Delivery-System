import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/app/environment/environment';
import { Restaurant } from 'src/app/models/restaurant';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FilterObject } from 'src/app/models/filter-object';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants-listing',
  templateUrl: './restaurants-listing.component.html'
})
export class RestaurantsListingComponent implements OnInit, AfterViewInit{

  keyWord: string;
  environment = environment;
  dataSource = new MatTableDataSource<Restaurant>();
  paginatorTotal: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'category'];
  filterObject = new FilterObject();

  constructor(private router: Router, private _crudService:CrudService) {
    
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    merge(this.paginator.page)
      .pipe(
        tap(() => {
          this.getRestaurantsList("");
        })
      )
      .subscribe();
    this.getRestaurantsList("");
  }

  getRestaurantsList(KeyWord: string) {
    this.filterObject.SearchObject = KeyWord;
    this.filterObject.PageNumber = this.paginator.pageIndex + 1;
    this.filterObject.PageSize = this.paginator.pageSize ? this.paginator.pageSize : environment.pageSize;
    this._crudService.getPaginatedList('restaurants', this.filterObject).subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result.Results);
      this.paginatorTotal = result.TotalRecords;
      console.log(result);
      
    });
  }

  view(restaurant) {
    this.router.navigate(["/restaurants/", restaurant.RestaurantName],
    );
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.getRestaurantsList("")
      )
    ).subscribe();
  }

  Filter(){

  }
}
