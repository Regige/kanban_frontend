import { Component } from '@angular/core';
import { ContactsPageService } from '../../services/contacts-page.service';
import { ContactsService } from '../../services/contacts.service';
import { UserIconComponent } from './user-icon/user-icon.component';
import { ChangeBtnComponent } from './change-btn/change-btn.component';
import { NgForm } from '@angular/forms';
import { ScriptService } from '../../services/script.service';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog-contact',
  standalone: true,
  imports: [UserIconComponent, ChangeBtnComponent, FormsModule],
  templateUrl: './dialog-contact.component.html',
  styleUrl: './dialog-contact.component.scss'
})
export class DialogContactComponent {

  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(public contactsPg: ContactsPageService, public contacts: ContactsService, private scp: ScriptService, private data: DataService) {}

  ngOnInit(): void {
    if(this.contactsPg.editContact === true) {
      this.loadContactData();
    }
  }

  loadContactData(): void {
    const contact = this.contactsPg.clickedContact;
    if (contact) {
      this.name = contact.title;
      this.email = contact.email;
      this.phone = contact.phone;
    }
  }


  async createNewContact(form: NgForm) {
    try {
      let contactColor = this.contactsPg.getContactColor();
      let contactNameAlterd = this.name.charAt(0).toUpperCase() + this.name.slice(1);
      let logogram = this.contactsPg.getLogogram(contactNameAlterd);
      
      let resp: any = await this.data.saveNewContactInBackend(contactNameAlterd, this.email, this.phone, logogram, contactColor);

      let newContact = this.contactsPg.setJSON(resp);
      this.data.contacts.push(newContact);
      this.contactsPg.sortContactsList();
      
      this.contactsPg.closeNewContacts();
      form.resetForm();
      this.scp.showPopup('Contact succesfully created');

    } catch(e) {
      console.error(e);
    }
  }


  async onDeleteContact() {
    try {
      const contactId = this.contactsPg.clickedContact.id;

      let resp = await this.data.deleteContactInBackend(contactId);
      console.log('So sieht die resp aus', resp);
      this.data.contacts.splice(this.contactsPg.findContactById(contactId), 1); 
      this.contactsPg.clickedContact = null;
      this.contactsPg.sortContactsList();

      this.contactsPg.closeNewContacts();
      this.scp.showPopup('Contact deleted');
    } catch(e) {
      console.error(e);
    }
  }


  async onSaveChangedContact() {
    try {
      const contactId = this.contactsPg.clickedContact.id;
      const contactIndex = this.contactsPg.findContactById(contactId);

      let body = {
        title: this.name,
        email: this.email,
        phone: this.phone,
        hex_color: this.contactsPg.clickedContact.hex_color,
        logogram: this.contactsPg.clickedContact.logogram
      };

      let resp:any = await this.data.updateContactInBackend(contactId, body);
      console.log('So sieht die resp aus', resp);

      let changedContact = this.contactsPg.setJSON(resp);

      this.data.contacts[contactIndex] = changedContact; 
      this.contactsPg.clickedContact = changedContact;
      this.contactsPg.sortContactsList();

      this.contactsPg.closeNewContacts();
      this.scp.showPopup('Contact changed');

    } catch(e) {
        console.error(e);
    }

  }







}
