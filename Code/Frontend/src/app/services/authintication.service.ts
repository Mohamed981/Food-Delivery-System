import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../environment/environment';
import { Register } from '../models/register';
import { Result } from '../models/Result.dto';
import { Token } from '../models/Token';

export interface LoginForm {
  Email: string;
  Password: string;
}

export const JWT_NAME = 'user-token';

@Injectable({
  providedIn: 'root',
})
export class AuthinticationService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginForm: LoginForm) {
    console.log(loginForm);
    
    return this.http
      .post<Result<Token>>(environment.apiBaseURL + 'users/signin', {
        Email: loginForm.Email,
        Password: loginForm.Password,
      })
      .pipe(
        map((res) => {
          if (res.Errors.length!==0) {
            return res.Errors;
          }
          localStorage.setItem(JWT_NAME, res.results.token);
          return '';
        })
      );
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }

  register(user: Register) {

    return this.http
      .post<Result<Token>>(environment.apiBaseURL + 'users/signup', user)
      .pipe(
        map((res) => {
          if (res.Errors.length!==0) {
            return res.Errors;
          }
          localStorage.setItem(JWT_NAME, res.results.token);
          return '';
        })
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUser(): Observable<number> {
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: any) =>
        of(this.jwtHelper.decodeToken(jwt)).pipe(map((jwt: any) => jwt))
      )
    );
  }
}
