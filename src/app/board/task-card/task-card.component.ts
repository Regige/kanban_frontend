import { Component, Input } from '@angular/core';
import { TaskCardUserComponent } from './task-card-user/task-card-user.component';
import { TaskCardSubtaskComponent } from './task-card-subtask/task-card-subtask.component';
import { BoardService } from '../../services/board.service';
import { TouchService } from '../../services/touch.service';


@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [TaskCardUserComponent, TaskCardSubtaskComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  @Input() task: any;
  @Input() index: number = -1;

  priority_img: string = "";
  categoryColor: string = "";

  constructor(private board: BoardService, public touch: TouchService) {}

  ngOnInit() {
    this.priority_img = 'assets/img/task-prio-' + this.task.priority.charAt(0).toLowerCase() + '.svg';

    this.categoryColor = this.board.getCategoryColor(this.task.category);
  }

  ngOnChanges() {
    this.priority_img = 'assets/img/task-prio-' + this.task.priority.charAt(0).toLowerCase() + '.svg';
    this.categoryColor = this.board.getCategoryColor(this.task.category);
  }



}
