import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
})
export class AddItemComponent implements OnInit {
  restaurantName: string;
  restaurant: Restaurant;

  constructor(
    private router: Router,
    private _crudService: CrudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restaurantName = this.route.snapshot.paramMap.get('restaurantName');
    this._crudService
      .getByName('restaurants', this.restaurantName)
      .subscribe((result: any) => {
        this.restaurant = result;
      });
  }
}
