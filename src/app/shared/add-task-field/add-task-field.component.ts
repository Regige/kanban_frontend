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
import { BoardService } from '../../services/board.service';


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

  constructor(public contactsPg: ContactsPageService, public taskPg: AddTaskPageService, public task: AddTaskService, public data: DataService, public taskVar: AddTaskVarService, private router: Router, private scp: ScriptService, public board: BoardService
  ) {}


  ngOnInit() {
    if(this.board.editTask) {
      this.insertValuesIntoForm();
    }
  }


  async saveTask(form: NgForm) {

    const body = {
      "title": this.title,
      "text": this.text,
      "due_date": this.due_date,
      "priority":  this.task.checkIfPrioIsSelected(), // this.taskVar.taskPrio muss auf null gesetzt werden
      "category": this.category,
      "task_board": this.task.getTaskBoardField(), // this.taskVar.taskBoardField muss auf null gesetzt werden.
      "assigned_to": this.task.getAssignedToUsers()
      // "subtasks": this.taskVar.subtasks // muss auch auf null gesetzt werden
    }

    if(this.board.editTask) {
      this.updateTask(form, body);

    } else {
        try {
          let resp: any = await this.data.saveTaskInBackend(body);

          console.log("New Task wurde erstellt: ", resp)

          if(this.taskVar.subtasks) {
            await this.saveSubtasks(form, resp.id);
          }
    
          this.resetEverything(form);
          this.task.removeStringFromLocalStorage();

          // this.scp.showPopup('Task added to board');
          this.router.navigateByUrl('/board');
    
        } catch(e) {
          this.resetEverything(form);
          this.task.removeStringFromLocalStorage();
          console.error(e);
        }
    }

  }


  async saveSubtasks(form:NgForm, id: number) {
    for(let i = 0; i < this.taskVar.subtasks.length; i++) {
      let subtask = this.taskVar.subtasks[i];
      try {
        let body = {
          "task": id,
          "title": subtask.title,
          "completed": subtask.completed
        }
        let resp = await this.data.saveSubtaskInBackend(body);
                
        } catch(e) {
          this.resetEverything(form);
          this.task.removeStringFromLocalStorage();
          console.error(e);
        }
    }
  }


  insertValuesIntoForm() {
    this.title = this.board.clickedTask.title;
    this.text = this.board.clickedTask.text;
    this.due_date = this.board.clickedTask.due_date;
    this.category = this.board.clickedTask.category;

    this.taskVar.taskPrio = this.board.clickedTask.priority;

    this.task.setPrioButtonColor(this.taskVar.taskPrio);

    this.taskVar.subtasks = JSON.parse(JSON.stringify(this.board.clickedTask.subtasks));

    this.taskVar.taskBoardField = this.board.clickedTask.task_board;

    if(this.board.clickedTask.assigned_to.length > 0) {

      this.taskVar.edit_assigned_to = JSON.parse(JSON.stringify(this.board.clickedTask.assigned_to));
    }
  }


  async updateTask(form: NgForm, body: any) {

    let updatedBody = {
      "title": body.title,
      "text": body.text,
      "due_date": body.due_date,
      "priority":  body.priority,
      "category": body.category,
      "task_board": body.task_board,
      "assigned_to": this.taskVar.edit_assigned_to
    }

    if(this.taskVar.subtasks.length > 0 || this.taskVar.subtasksToDelete.length > 0) {
      let resp = await this.updateSubtasks(this.taskVar.subtasks, form);
      console.log("So sieht die Antwort aus: ", resp);
      
      }

    try {
      let resp: any = await this.data.updateTaskInBackend(this.board.clickedTask.id, updatedBody)
      console.log("Update sieht so aus: ", resp);

      let taskIndex = this.board.findTaskById(this.board.clickedTask.id);
      this.data.tasks[taskIndex] = this.board.setJSONforTask(resp);
      this.scp.showPopup("Task updated");

      this.resetEverything(form);

    } catch(e) {
      console.error(e);
      this.resetEverything(form);
    }
  }


  resetEverything(form: NgForm) {
      form.resetForm();
      this.board.closeBoardCard();
      this.task.resetTaskForm();
  }



  async updateSubtasks(subtasks: any, form: NgForm) {
    for(let i = 0; i < subtasks.length; i++) {
          let subtask = subtasks[i];
            if(subtask.id) {
                if(subtask.update) {
                  // Update subtask
                  try {
                    let body = {
                      "title": subtask.title
                    }
                    let resp = await this.data.update_partiallySubtaskInBackend(subtask.id, body);

                  } catch(e) {
                    console.error(e);
                    this.resetEverything(form);
                  }
                }
            } else {
              try {
                // Post neue subtask
                let body = {
                  "task": this.board.clickedTask.id,
                  "title": subtask.title,
                  "completed": subtask.completed
                }
                let resp = await this.data.saveSubtaskInBackend(body);
                
              } catch(e) {
                console.error(e);
                this.resetEverything(form);
              }
            }
    }
    if(this.taskVar.subtasksToDelete) {
      for(let j = 0; j < this.taskVar.subtasksToDelete.length; j++) {
        try {
          // delete subtask
          let resp = await this.data.deleteSubtaskInBackend(this.taskVar.subtasksToDelete[j])
          
        } catch(e) {
          console.error(e);
          this.resetEverything(form);
        }
      }
    }
  }
}
