import { Component } from '@angular/core';
import { ContactsPageService } from '../../services/contacts-page.service';
import { ContactsService } from '../../services/contacts.service';
import { UserIconComponent } from './user-icon/user-icon.component';
import { ChangeBtnComponent } from './change-btn/change-btn.component';
import { NgForm } from '@angular/forms';
import { ScriptService } from '../../services/script.service';
import { FormsModule } from '@angular/forms';

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

  constructor(public contactsPg: ContactsPageService, public contacts: ContactsService, private scp: ScriptService) {}


  async createNewContact(form: NgForm) {
    try {
      let resp = await this.contacts.saveNewContact(this.name, this.email, this.phone);
   
      console.log(resp);  
      this.contactsPg.closeNewContacts();
      form.resetForm();
      this.scp.showPopup('Contact succesfully created');

    } catch(e) {
      console.error(e);
    }
  }


}
