import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../environment/environment';
import { User } from '../models/User';

export interface LoginForm {
  email: string;
  password: string;
};

export const JWT_NAME = 'user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthinticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm) {  

    return this.http.post<any>('/api/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        if(token === undefined){
          return "wrong email or password"
        }
        console.log('token' + token.access_token);
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }

  register(user: User) {
    user.IsOwner=false;
    console.log(user);
    
    return this.http.post<any>(environment.apiBaseURL+'users', user).pipe(
      map((token) => {
        console.log(token);
        
        if(token === null){
          return "Email is registered";
        }
        console.log('token' + token.token);
        localStorage.setItem(JWT_NAME, token.token);
        return token;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): Observable<number>{
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: string) => of(this.jwtHelper.decodeToken(jwt)).pipe(
        map((jwt: any) => jwt.user.id)
      )
    ));
  }
}
