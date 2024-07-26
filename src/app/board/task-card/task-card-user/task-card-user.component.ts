import { Component, Input } from '@angular/core';
import { ContactsPageService } from '../../../services/contacts-page.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-task-card-user',
  standalone: true,
  imports: [],
  templateUrl: './task-card-user.component.html',
  styleUrl: './task-card-user.component.scss'
})
export class TaskCardUserComponent {

  @Input() userId: any;
  userInfos: any;

  constructor(private contactsPg: ContactsPageService, private data: DataService) {}

  ngOnInit() {
    this.getUserInfo();
  }


  getUserInfo() {
    const userindex = this.contactsPg.findContactById(this.userId);

    this.userInfos = this.data.contacts[userindex];
  }
}
