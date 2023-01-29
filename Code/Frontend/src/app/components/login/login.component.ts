import { Component } from '@angular/core';
import {
  AuthinticationService,
} from '../../services/authintication.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errors: string[];

  constructor(
    private authService: AuthinticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    
    this.authService.login(this.loginForm.value).subscribe((res:string[]) => {
      if (res.length !== 0) this.errors = res;
      else this.router.navigate(['restaurants']);
    });
  }
}
