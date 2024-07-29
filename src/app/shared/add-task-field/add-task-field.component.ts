import { Component } from '@angular/core';
import { ContactsPageService } from '../../services/contacts-page.service';
import { AddTaskPageService } from '../../services/add-task-page.service';
import { AddTaskService } from '../../services/add-task.service';
import { DataService } from '../../services/data.service';
import { AddTaskVarService } from '../../services/add-task-var.service';
import { SubtaskLiComponent } from './subtask-li/subtask-li.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ScriptService } from '../../services/script.service';


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


  constructor(public contactsPg: ContactsPageService, public taskPg: AddTaskPageService, public task: AddTaskService, public data: DataService, public taskVar: AddTaskVarService, private router: Router, private scp: ScriptService
  ) {}


  async saveTask(form: NgForm) {

    const body = {
      "title": this.title,
      "text": this.text,
      "due_date": this.due_date,
      "priority":  this.task.checkIfPrioIsSelected(), // this.taskVar.taskPrio muss auf null gesetzt werden
      "category": this.category,
      "task_board": this.task.getTaskBoardField(), // this.taskVar.taskBoardField muss auf null gesetzt werden.
      "assigned_to": this.task.getAssignedToUsers(),
      "subtasks": this.taskVar.subtasks // muss auch auf null gesetzt werden
    }

    try {
      let resp: any = await this.data.saveTaskInBackend(body);
      console.log(resp);
      form.resetForm();
      this.task.resetTaskForm();
      // this.scp.showPopup('Task added to board');
      this.router.navigateByUrl('/board');

    } catch(e) {
      console.error(e);
    }
  }

}
