import { Component } from '@angular/core';
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

  constructor(public contacts: ContactsService, public contactsPg: ContactsPageService) {}

}
