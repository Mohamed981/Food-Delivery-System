import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { AuthinticationService } from 'src/app/services/authintication.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
})
export class AddRestaurantComponent {
  restaurantForm: FormGroup;
  errors: string;
  userCredentials: any;

  constructor(
    private crudService: CrudService,
    private authService: AuthinticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => (this.userCredentials = res));
    this.restaurantForm = new FormGroup({
      RestaurantName: new FormControl(null, [Validators.required]),
      Category: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.restaurantForm.invalid) {
      return;
    }
    console.log(this.userCredentials);
    
    this.crudService
      .add('restaurants', {
        ...this.restaurantForm.value,
        userId: this.userCredentials.sub,
      })
      .subscribe((res:any) => {
        console.log(res);
        
        if (res === null) this.errors = 'This Name is taken';
        else this.router.navigate(['restaurants/',this.restaurantForm.value.RestaurantName]);
      });
  }
}
