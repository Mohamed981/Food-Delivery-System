import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { Restaurant } from 'src/app/models/restaurant';
import { Result } from 'src/app/models/Result.dto';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
})
export class AddItemComponent implements OnInit {
  restaurantName: string;
  restaurant: Restaurant;
  item:Item;
  itemForm: FormGroup;

  constructor(
    private router: Router,
    private _crudService: CrudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.item={
      ItemName:'',
      ItemPrice:null
    }
    this.restaurantName = this.route.snapshot.paramMap.get('restaurantName');
    this._crudService
      .getByName('restaurants', this.restaurantName)
      .subscribe((result: Result<Restaurant>) => {
        this.restaurant = result.results;
      });
    this.itemForm = new FormGroup({
      ItemName: new FormControl(null, [Validators.required]),
      ItemPrice: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.item);
    if (!this.itemForm.valid) return;
    this.item.restaurantId=this.restaurant.id;
    this._crudService.add<Result<Item>>('items',this.item).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['restaurants/',this.restaurant.RestaurantName]);
    })
  }
}
