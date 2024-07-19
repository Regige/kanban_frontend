import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AddTaskPageService } from '../services/add-task-page.service';
import { AddTaskService } from '../services/add-task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
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
      this.taskPg.loadAddTaskForm();
      await this.stg.loadUserData();
      this.stg.loadFromLocalStorage();
      this.stg.loadFromLocalStorageContacts();
      this.task.loadStringFromLocalStorage();
  // }
  }
}
