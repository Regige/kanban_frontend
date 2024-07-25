import { Component } from '@angular/core';
import { ContactsPageService } from '../../../services/contacts-page.service';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.scss'
})
export class UserIconComponent {

  constructor(public contactsPg: ContactsPageService) {}

}
