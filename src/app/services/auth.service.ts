import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  public loginWithEmailAndPassword(email: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      "username": email,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body)); // lastValueFrom wandelt subscribeables in ein promis um 
  }


  public register(body: any) {
    const url = environment.baseUrl + '/register/';
    // const body = {
    //   "username": email,
    //   "password": password
    // }
    return lastValueFrom(this.http.post(url, body));
  }


  public logout() {
    const url = environment.baseUrl + '/logout_user/';

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Token ' + localStorage.getItem('token'));

    return lastValueFrom(this.http.post(url, {
      headers: headers
    }));
  }
}
