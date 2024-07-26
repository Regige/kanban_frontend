import { Component, Input } from '@angular/core';
import { TaskCardUserComponent } from './task-card-user/task-card-user.component';
import { TaskCardSubtaskComponent } from './task-card-subtask/task-card-subtask.component';


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

  constructor() {}

  async ngOnInit() {
    this.priority_img = 'assets/img/task-prio-' + this.task.priority.charAt(0).toLowerCase() + '.svg';

    this.getCategoryColor();
  }


  getCategoryColor() {
    if(this.task.category === "Work")
      this.categoryColor = '#1FD7C1'
    if(this.task.category === "Privat")
      this.categoryColor = '#0038FF'
    if(this.task.category === "Shopping")
      this.categoryColor = '#FF7A00'
    if(this.task.category === "Other")
      this.categoryColor = '#FFBB2B'
  }

}
