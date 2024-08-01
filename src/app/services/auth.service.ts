import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
