import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks: any = [];
  contacts: any = [];

  constructor(private http: HttpClient) { }



  loadTasks() {
    const url = environment.baseUrl + '/tasks/';

    return lastValueFrom(this.http.get(url));
  }


  loadContacts() {
    const url = environment.baseUrl + '/contacts/';

    return lastValueFrom(this.http.get(url));
  }




}
