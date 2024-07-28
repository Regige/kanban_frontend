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

  tasks: Task[] = [];
  contacts: Contact[] = [];
  urlTask = environment.baseUrl + '/tasks/';
  urlSubtask = environment.baseUrl + '/subtasks/';
  urlContact = environment.baseUrl + '/contacts/';

  constructor(private http: HttpClient) { }




  // Task Operations


  loadTasks() {
    // const url = environment.baseUrl + '/tasks/';

    return lastValueFrom(this.http.get(this.urlTask));
  }


  saveTaskInBackend(body: any) {

      return lastValueFrom(this.http.post(this.urlTask, body));
  }



  deleteTaskInBackend(id: number) {
      const urlTaskAndId = this.urlTask + id;

      return lastValueFrom(this.http.delete(urlTaskAndId));
  }


  update_partiallyTaskInBackend(id: number, body: any) {
      const urlContactAndId = this.urlContact + id + '/';

      return lastValueFrom(this.http.patch(urlContactAndId, body));
  }


  // Subtask Operations

  updateSubtaskInBackend(id: number, body: any) {
      const urlContactAndId = this.urlSubtask + id + '/';

      return lastValueFrom(this.http.put(urlContactAndId, body));
  }

  update_partiallySubtaskInBackend(id: number, body: any) {
      const urlContactAndId = this.urlSubtask + id + '/';

      return lastValueFrom(this.http.patch(urlContactAndId, body));
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
      "hex_color": contactColor
    }

    console.log(body);

    // return this.http.post(this.urlContact, body);

    return lastValueFrom(this.http.post(this.urlContact, body));
  }

  deleteContactInBackend(id: number) {
      const urlContactAndId = this.urlContact + id;

      return lastValueFrom(this.http.delete(urlContactAndId));
  }



  updateContactInBackend(id: number, body: any) {
      const urlContactAndId = this.urlContact + id + '/';

      return lastValueFrom(this.http.put(urlContactAndId, body));
  }




}
