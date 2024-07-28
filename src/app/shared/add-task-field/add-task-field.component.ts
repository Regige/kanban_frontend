import { Component } from '@angular/core';
import { ContactsPageService } from '../../services/contacts-page.service';
import { AddTaskPageService } from '../../services/add-task-page.service';
import { AddTaskService } from '../../services/add-task.service';
import { DataService } from '../../services/data.service';
import { AddTaskVarService } from '../../services/add-task-var.service';
import { SubtaskLiComponent } from './subtask-li/subtask-li.component';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-task-field',
  standalone: true,
  imports: [SubtaskLiComponent, FormsModule],
  templateUrl: './add-task-field.component.html',
  styleUrl: './add-task-field.component.scss'
})
export class AddTaskFieldComponent {

    title = '';
    text = '';
    due_date = '';
    category = '';
    // subtasks: [],


  constructor(public contactsPg: ContactsPageService, public taskPg: AddTaskPageService, public task: AddTaskService, public data: DataService, public taskVar: AddTaskVarService
  ) {}


  async saveTask(form: NgForm) {

    const body = {
      "title": this.title,
      "text": this.text,
      "due_date": this.due_date,
      "priority":  this.task.checkIfPrioIsSelected(), // this.taskVar.taskPrio muss auf null gesetzt werden
      "category": this.category,
      "task_board": this.task.getTaskBoardField() // this.taskVar.taskBoardField muss auf null gesetzt werden.
      // "task_user": this.task.getAssignedToUsers(),
      // "subtasks": this.taskVar.subtasks // muss auch auf null gesetzt werden
    }

    console.log(body);

    try {
      let resp: any = await this.data.saveTaskInBackend(body);
      console.log(resp);
      form.resetForm();
      this.task.resetTaskForm();

      // this.router.navigateByUrl('/board');

    } catch(e) {
      console.error(e);
    }
  }

}
