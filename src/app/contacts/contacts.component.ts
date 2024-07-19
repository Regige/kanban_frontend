import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ContactsPageService } from '../services/contacts-page.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {


  constructor(public stg: StorageService, private contactsPg: ContactsPageService) {}

    /**
   * This function starts all the necessary functions to run the contacts.html
   */
    async ngOnInit() {
  // async initContacts() {
        await this.stg.loadUserData();
        this.stg.loadFromLocalStorage();
        this.stg.loadFromLocalStorageContacts();
        this.contactsPg.renderContacts();
  // }
    }

}
