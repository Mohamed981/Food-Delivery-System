import { Component } from '@angular/core';
import { AuthinticationService, JWT_NAME } from '../../services/authintication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  
  constructor(
    private authService: AuthinticationService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      //map(token => this.router.navigate(['restaurants']))
    ).subscribe(res => {console.log(res)
      if(localStorage.getItem(JWT_NAME) === undefined)
        console.log(res);
      }
    )
    
  }
}
