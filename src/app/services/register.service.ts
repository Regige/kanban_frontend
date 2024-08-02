import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ScriptService } from './script.service';
import { ContactsService } from './contacts.service';
import { Contact } from '../interfaces/contact';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private stg: StorageService, private scp: ScriptService, private contacts: ContactsService, private as: AuthService) { }



  /**
   * Reset the registration form values.
   */
//   resetFormValue() {
//       let name = <HTMLInputElement>document.getElementById('nameregister');
//       let email = <HTMLInputElement>document.getElementById('emailregister');
//       let password = <HTMLInputElement>document.getElementById('passwordregister1');
//       let password2 = <HTMLInputElement>document.getElementById('passwordregister2');
//       let rgstBtn = document.getElementById('registerBtn') as HTMLButtonElement;

//       if (name)
//         name.value = '';
//       if (email)
//         email.value = '';
//       if (password)
//         password.value = '';
//       if (password2)
//         password2.value = '';
//       if (rgstBtn)
//         rgstBtn.disabled = false;
//   }



  /**
   * Add a user to the provided contacts list.
   * @param {string} user - The email of the user.
   * @param {string} name - The name of the user.
   * @param {Array} new_contact - The contacts list to which the user should be added.
   * @returns {number} The new length of the contacts list after adding the user.
   */
//   addUserToContacts(user:string, name:string, new_contact: Contact[]): Contact[] {
//       if(user !== 'guest') {
//           let nameAlterd = name.charAt(0).toUpperCase() + name.slice(1);
//           let ownContactData = {
//               'title': nameAlterd,
//               'email': user,
//               'phone': "",
//               'logogram': this.contacts.getLogogram(nameAlterd),
//               'hex_color': this.contacts.getContactColor(),
//           }
//           new_contact.push(ownContactData);
//       } 
//       return new_contact;
//     }

}
