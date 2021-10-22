import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Token: localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<any> {
    const token = localStorage.getItem('token') !== null ? localStorage.getItem('token') :'ABC' ; // get token from local storage
    const payload = ''; // decode payload of token
    //const parsedPayload = JSON.parse(payload); // convert payload into an Object
    return this.http.post<any>('/api/login/validToken', { token: token },this.httpOptions); // check if token is expired
  }

  login(user:string,password:string): Observable<any>{
    return this.http.post<any>('/api/login/iniciar', { email: user,password:password });
  }
}
