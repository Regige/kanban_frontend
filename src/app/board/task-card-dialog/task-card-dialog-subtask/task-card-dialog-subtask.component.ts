import { Component, Input } from '@angular/core';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-task-card-dialog-subtask',
  standalone: true,
  imports: [],
  templateUrl: './task-card-dialog-subtask.component.html',
  styleUrl: './task-card-dialog-subtask.component.scss'
})
export class TaskCardDialogSubtaskComponent {

  @Input() subtask: any;
  @Input() index: number = -1;

  constructor(public board: BoardService) {}

}
