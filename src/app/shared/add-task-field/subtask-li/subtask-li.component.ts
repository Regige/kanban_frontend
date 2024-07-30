import { Component, Input } from '@angular/core';
import { AddTaskPageService } from '../../../services/add-task-page.service';

@Component({
  selector: 'app-subtask-li',
  standalone: true,
  imports: [],
  templateUrl: './subtask-li.component.html',
  styleUrl: './subtask-li.component.scss'
})
export class SubtaskLiComponent {

  @Input() subtaskText: string = "";
  @Input() i: number = -1;
  @Input() subtask: any;

  constructor(public taskPg: AddTaskPageService) {}

}
