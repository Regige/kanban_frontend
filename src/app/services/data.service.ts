import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';
import { Contact } from '../interfaces/contact';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks: any = [];
  contacts: Contact[] = [];
  urlTask = environment.baseUrl + '/tasks/';
  urlContact = environment.baseUrl + '/contacts/';

  constructor(private http: HttpClient) { }




  // Task Operations


  loadTasks() {
    // const url = environment.baseUrl + '/tasks/';

    return lastValueFrom(this.http.get(this.urlTask));
  }




  // Contact Operations

  loadContacts() {
    // const url = environment.baseUrl + '/contacts/';

    return lastValueFrom(this.http.get(this.urlContact));
  }


    saveNewContactInBackend(contactNameAlterd: string, email: string, phone: string, logogram: string, contactColor: string) {

    const body = {
      "title": contactNameAlterd,
      "email": email,
      "phone": phone,
      "logogram": logogram,
      "hex_color": contactColor,
    }

    // return this.http.post(this.urlContact, body);

    return lastValueFrom(this.http.post(this.urlContact, body));
  }

  deleteContactInBackend(id: number) {
      const urlContactAndId = this.urlContact + id;

      return lastValueFrom(this.http.delete(urlContactAndId));
  }



  updateContactInBackend(id: number, body: any) {
      const urlContactAndId = this.urlContact + id;

      return lastValueFrom(this.http.put(urlContactAndId, body));
  }




}
