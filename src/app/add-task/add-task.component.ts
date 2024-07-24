import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AddTaskPageService } from '../services/add-task-page.service';
import { AddTaskService } from '../services/add-task.service';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { AddTaskFieldComponent } from '../shared/add-task-field/add-task-field.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, AddTaskFieldComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {


  constructor(public stg: StorageService, public taskPg: AddTaskPageService, public task: AddTaskService) {}

    /**
   * This function starts the functions to load all the necessary data
   */
  async ngOnInit() {
  // async function initAddTask() {
      // this.taskPg.loadAddTaskForm();
      this.taskPg.preventPastDate();
      await this.stg.loadUserData();
      this.stg.loadFromLocalStorage();
      this.stg.loadFromLocalStorageContacts();
      this.task.loadStringFromLocalStorage();
  // }
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
