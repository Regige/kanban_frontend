import { Component, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ContactsPageService } from '../../../services/contacts-page.service';
import { Contact } from '../../../interfaces/contact';

@Component({
  selector: 'app-task-card-dialog-user',
  standalone: true,
  imports: [],
  templateUrl: './task-card-dialog-user.component.html',
  styleUrl: './task-card-dialog-user.component.scss'
})
export class TaskCardDialogUserComponent {


   @Input() userId: number = -1;

   contact: Contact = {} as Contact;

   constructor(private data: DataService, private contactPg: ContactsPageService) {}

   ngOnInit() { 
    this.contact = this.data.contacts[this.contactPg.findContactById(this.userId)];
    
   }

}
