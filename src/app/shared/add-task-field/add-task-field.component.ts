import { Component } from '@angular/core';
import { ContactsPageService } from '../../services/contacts-page.service';
import { AddTaskPageService } from '../../services/add-task-page.service';
import { AddTaskService } from '../../services/add-task.service';

@Component({
  selector: 'app-add-task-field',
  standalone: true,
  imports: [],
  templateUrl: './add-task-field.component.html',
  styleUrl: './add-task-field.component.scss'
})
export class AddTaskFieldComponent {

  constructor(public contactsPg: ContactsPageService, public taskPg: AddTaskPageService, public task: AddTaskService
  ) {}
}
