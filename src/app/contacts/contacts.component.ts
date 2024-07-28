import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ContactsPageService } from '../services/contacts-page.service';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { DataService } from '../services/data.service';
import { ContactListTagComponent } from './contact-list-tag/contact-list-tag.component';
import { ClickedContactComponent } from './clicked-contact/clicked-contact.component';
import { Contact } from '../interfaces/contact';
import { LetterSeperatorComponent } from './letter-seperator/letter-seperator.component';
import { DialogContactComponent } from '../shared/dialog-contact/dialog-contact.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ContactListTagComponent, ClickedContactComponent, LetterSeperatorComponent, DialogContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  error = '';

  constructor(public stg: StorageService, public contactsPg: ContactsPageService, public data: DataService) {}

    /**
   * This function starts all the necessary functions to run the contacts.html
   */
    async ngOnInit() {
      try {
        const rawContacts: any = await this.data.loadContacts();
        this.data.contacts = this.contactsPg.mapContacts(rawContacts);

        this.contactsPg.sortContactsList();
        console.log(this.data.contacts);

      } catch(e) {
        this.error = 'Fehler beim Laden!';
      }
    }


    shouldRenderSeparator(currentIndex: number): boolean {
      if (currentIndex === 0) return true;
      const currentLetter = this.data.contacts[currentIndex].title[0].toUpperCase();
      const previousLetter = this.data.contacts[currentIndex - 1].title[0].toUpperCase();
      return currentLetter !== previousLetter;
  }

}
