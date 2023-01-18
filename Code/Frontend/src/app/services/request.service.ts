import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient, private _router: Router) {
}
SendRequest(method: string, url: string, data: any): Observable<any> {

  return this.http.request(method, url,
  {
          //headers: this.jwt(),
          body: data
          });
  }

  private jwt() {
  // create authorization header with jwt token
      const token = localStorage.getItem('accessToken');
          const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
          });
          return headers;
  }
}
