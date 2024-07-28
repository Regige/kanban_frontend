import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AddTaskPageService } from '../services/add-task-page.service';
import { AddTaskService } from '../services/add-task.service';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { AddTaskFieldComponent } from '../shared/add-task-field/add-task-field.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ContactsPageService } from '../services/contacts-page.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, AddTaskFieldComponent, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {


  // title: string = '';
  // description: string = '';
  // due_date: string = '';


  constructor(public stg: StorageService, public taskPg: AddTaskPageService, public task: AddTaskService, private data: DataService, private contactsPg: ContactsPageService) {}

    /**
   * This function starts the functions to load all the necessary data
   */
  async ngOnInit() {
  // async function initAddTask() {
      // this.taskPg.loadAddTaskForm();
      this.taskPg.preventPastDate();
      // await this.stg.loadUserData();
      // this.stg.loadFromLocalStorage();
      // this.stg.loadFromLocalStorageContacts();
      // this.task.loadStringFromLocalStorage();
  // }
    try {
      const rawContacts: any = await this.data.loadContacts();
      this.data.contacts = this.contactsPg.mapContacts(rawContacts);

      this.contactsPg.sortContactsList();

    } catch(e) {
        console.log(e);
        // this.error = 'Fehler beim Laden!';
      }
  }


  // loadAddTaskForm() {
  //     let addTaskForm = document.getElementById('task-input-con');
  //     if(addTaskForm) {
  //       addTaskForm.innerHTML = "";
  //       addTaskForm.innerHTML = this.taskHtml.createAddTask();
  //       this.taskPg.preventPastDate();
  //     }
  // }
}
