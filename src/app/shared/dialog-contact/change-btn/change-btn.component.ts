import { Component, Output, EventEmitter } from '@angular/core';
import { ContactsService } from '../../../services/contacts.service';
import { ContactsPageService } from '../../../services/contacts-page.service';

@Component({
  selector: 'app-change-btn',
  standalone: true,
  imports: [],
  templateUrl: './change-btn.component.html',
  styleUrl: './change-btn.component.scss'
})
export class ChangeBtnComponent {

  @Output() deleteContact = new EventEmitter<void>();
  @Output() saveChangedContact = new EventEmitter<void>();

  constructor(public contacts: ContactsService, public contactsPg: ContactsPageService) {}


  onDeleteContacts() {
    this.deleteContact.emit();
  }


  onSaveChangedContact() {
    this.saveChangedContact.emit();
  }

  
}
