import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { AuthinticationService } from 'src/app/services/authintication.service';
import { CrudService } from 'src/app/services/crud.service';

class CustomValidators {
  static passwordContainsNumber(control: AbstractControl): ValidationErrors {
    const regex = /\d/;

    if (regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return { passwordInvalid: true };
    }
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors {
    const password = control.get('Password');
    const confirmPassword = control.get('ConfirmPassword');

    if (
      password !== null &&
      confirmPassword !== null &&
      password.value === confirmPassword.value
    ) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  restaurantForm: FormGroup;
  userCredentials: any;
  registeredUser: Register;
  errors: string[];

  constructor(
    private authService: AuthinticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.registeredUser={
      Username:"",
      Category:"",
      Email:"",
      IsOwner:false,
      Password:"",
      RestaurantName:""
    }
    this.registerForm = this.formBuilder.group(
      {
        Username: [null, [Validators.required]],
        Email: [
          null,
          [Validators.required, Validators.email, Validators.minLength(6)],
        ],
        Password: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            CustomValidators.passwordContainsNumber,
          ],
        ],
        ConfirmPassword: [null, [Validators.required]],
        IsOwner: [null, [Validators.required]],
      },
      {
        validators: CustomValidators.passwordsMatch,
      }
    );
    this.restaurantForm = new FormGroup({
      RestaurantName: new FormControl(null, [Validators.required]),
      Category: new FormControl(null, [Validators.required]),
    });
  }

  isValid() {
    if (!this.registerForm.valid) return false;
    if (this.registerForm.value.IsOwner === false) return true;
    else if (this.registerForm.value.IsOwner && this.restaurantForm.valid)
      return true;
    return false;
  }
  onSubmit() {
    console.log(this.registeredUser);
    
    if (!this.registerForm.valid) return;
    if (this.registerForm.value.IsOwner && !this.restaurantForm.valid) return;
    this.authService.register(this.registeredUser).subscribe((res:string[]) => {
      if (res.length !== 0) {
        this.errors = res;
      }
      else{
        this.authService.getUser().subscribe((res) => (this.userCredentials = res));
        this.router.navigate(['restaurants/',this.registeredUser.RestaurantName]);
      }
      
    });
  }
}
