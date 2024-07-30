import { Component, ViewChild } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { AddTaskService } from '../../services/add-task.service';
import { TaskCardDialogSubtaskComponent } from './task-card-dialog-subtask/task-card-dialog-subtask.component';
import { TaskCardDialogUserComponent } from './task-card-dialog-user/task-card-dialog-user.component';
import { AddTaskFieldComponent } from '../../shared/add-task-field/add-task-field.component';
import { AddTaskPageService } from '../../services/add-task-page.service';

@Component({
  selector: 'app-task-card-dialog',
  standalone: true,
  imports: [TaskCardDialogSubtaskComponent, TaskCardDialogUserComponent, AddTaskFieldComponent],
  templateUrl: './task-card-dialog.component.html',
  styleUrl: './task-card-dialog.component.scss'
})
export class TaskCardDialogComponent {

  id = -1;
  story_bg = '';
  story = '';
  headline = '';
  text = '';
  date = '';
  priority = '';
  priority_img = '';

  

  constructor(public board: BoardService, public task: AddTaskService, public taskPg: AddTaskPageService) {}

  
  ngOnInit() {

    this.id = this.board.clickedTask.id;
    this.story_bg = this.board.getCategoryColor(this.board.clickedTask.category);
    this.story = this.board.clickedTask.category;
    this.headline = this.board.clickedTask.title;
    this.text = this.board.clickedTask.text;
    this.date = this.board.clickedTask.due_date;
    this.priority = this.board.clickedTask.priority;
    this.priority_img = 'assets/img/task-prio-' + this.board.clickedTask.priority.charAt(0).toLowerCase() + '.svg';

  }


  openEditTask() {
    this.board.editTask = true;
  }
}
