import { Component, Input } from '@angular/core';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-task-card-subtask',
  standalone: true,
  imports: [],
  templateUrl: './task-card-subtask.component.html',
  styleUrl: './task-card-subtask.component.scss'
})
export class TaskCardSubtaskComponent {

  @Input() subtasks: any;
  percent: number = 0;
  task_completed: number = 0;


  constructor(public board: BoardService) {}


  ngOnInit() {
    this.calcSubtaskInfo();
  }


  calcSubtaskInfo() {
    var element_subtask = 0;
    var element_percent = 0;

    for (let i = 0; i < this.subtasks.length; i++) {
      const element = this.subtasks[i];
      element_subtask = element_subtask + element.completed;
      element_percent = element.completed + element_percent;
    }
    this.task_completed = element_subtask;
    this.percent = (element_percent / this.subtasks.length) * 100;
  }


}
