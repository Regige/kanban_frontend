import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ContactsPageService } from '../services/contacts-page.service';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { DataService } from '../services/data.service';
import { ContactListTagComponent } from './contact-list-tag/contact-list-tag.component';
import { ClickedContactComponent } from './clicked-contact/clicked-contact.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ContactListTagComponent, ClickedContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  error = '';
  clickedContact: any = null;

  constructor(public stg: StorageService, public contactsPg: ContactsPageService, public data: DataService) {}

    /**
   * This function starts all the necessary functions to run the contacts.html
   */
    async ngOnInit() {
      try {
        this.data.contacts = await this.data.loadContacts();
        console.log(this.data.contacts);
        // this.contactsPg.renderContacts();

      } catch(e) {
        this.error = 'Fehler beim Laden!';
      }
  // async initContacts() {
        // await this.stg.loadUserData();
        // this.stg.loadFromLocalStorage();
        // this.stg.loadFromLocalStorageContacts();
  // }
    }



    showContact(contact: any) {
        this.clickedContact = contact;
    }

}
