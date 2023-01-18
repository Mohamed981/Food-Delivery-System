import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import {
  AuthinticationService,
  JWT_NAME,
} from 'src/app/services/authintication.service';

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
  errors: string;

  constructor(
    private authService: AuthinticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      },
      {
        validators: CustomValidators.passwordsMatch,
      }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if (localStorage.getItem(JWT_NAME) === 'undefined') {this.errors = res;}
      else this.router.navigate(['restaurants']);
    });
  }
}
