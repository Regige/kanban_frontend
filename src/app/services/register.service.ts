import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ScriptService } from './script.service';
import { ContactsService } from './contacts.service';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private stg: StorageService, private scp: ScriptService, private contacts: ContactsService) { }

  users: any = [];

  /**
   * Initialize the application by loading users from local storage and any external source.
   * @returns {Promise<void>}
   */
  async init() {
      this.loadUsersFromLocalStorage();
      this.loadUsers(); 
  }

  /**
   * Save the current users array to local storage.
   */
  saveUsersToLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users));
  }

  /**
   * Load users from local storage and update the users array.
   */
  loadUsersFromLocalStorage() {
      let storedUsers = localStorage.getItem('users');
      if (storedUsers) {
          this.users = JSON.parse(storedUsers);
      } else {
          this.users = [];
      }
  }

  /**
   * Load users from an external source, update the users array, and then save to local storage.
   * @returns {Promise<void>}
   */
  async loadUsers() {
      try {
          let parsedUsers = JSON.parse(await this.stg.getItem('users'));
          if (Array.isArray(parsedUsers)) {
              // this.users = parsedUsers;
          } else {
              console.error('Parsed users is not an array:', parsedUsers);
              this.users = [];
          }
          this.saveUsersToLocalStorage(); // Speichern Sie die `users` im LocalStorage.
      } catch (e) {
          console.error('Loading error:', e);
      }
  }

  /**
   * Handle the registration process for a new user.
   * @returns {Promise<void>}
   */
  async register() {
      if (!this.validateRegistrationFields()) {
          return;
      }
      
      await this.processRegistration();
  }

  /**
   * Validate the registration form fields.
   * @returns {boolean} Whether the form fields are valid or not.
   */
  validateRegistrationFields() {
      let checkbox = <HTMLInputElement>document.getElementById('privacyPolicyCheckbox');
      if (checkbox)
      if (!checkbox.checked) {
          this.scp.showPopup('Please accept the privacy policy before proceeding.');
          return false;
      }

      // let email = document.getElementById('emailregister')?.value;
      // let password1 = document.getElementById('passwordregister1')?.value;
      // let password2 = document.getElementById('passwordregister2')?.value;
      // let existingUser = this.users.find(u => u.email === email);
      
      // if (existingUser) {
      //     this.scp.showPopup('This email address is already registered. Please use a different one.');
      //     return false;
      // }

      // if (password1 !== password2) {
      //     this.scp.showPopup('Your password does not match.');
      //     return false;
      // }
      return true;
  }

  /**
   * Process the registration of a new user.
   * @returns {Promise<void>}
   */
  async processRegistration() {
      let email = document.getElementById('emailregister');
      let password1 = document.getElementById('passwordregister1');
      let name = document.getElementById('nameregister');
      let registerBtn = <HTMLInputElement>document.getElementById('registerBtn');

      // if (registerBtn)
      // registerBtn.disabled = true;
      // this.users.push({
      //     name: name.value,
      //     email: email.value,
      //     password: password1.value,
      // });
      // await setItem('users', JSON.stringify(users));
      // await loadStandardUserListAndContacts(email.value, name.value);
      // showPopupAndRedirect('You have successfully registered.', 'index.html');
      this.resetFormValue();
  }

  /**
   * Reset the registration form values.
   */
  resetFormValue() {
      let name = <HTMLInputElement>document.getElementById('nameregister');
      let email = <HTMLInputElement>document.getElementById('emailregister');
      let password = <HTMLInputElement>document.getElementById('passwordregister1');
      let password2 = <HTMLInputElement>document.getElementById('passwordregister2');
      let rgstBtn = document.getElementById('registerBtn') as HTMLButtonElement;

      if (name)
        name.value = '';
      if (email)
        email.value = '';
      if (password)
        password.value = '';
      if (password2)
        password2.value = '';
      if (rgstBtn)
        rgstBtn.disabled = false;
  }

  /**
   * Load a standard user list and contacts for the provided user and name.
   * @param {string} user - The email of the user.
   * @param {string} name - The name of the user.
   * @returns {Promise<void>}
   */
  async loadStandardUserListAndContacts(user:string, name:string) {
      let new_list = JSON.parse(await this.stg.getItem('guest-list'));
      await this.stg.setItem(user + '-list', new_list);
      let new_contact = JSON.parse(await this.stg.getItem('guest-contacts'));
      this.addUserToContacts(user, name, new_contact);
      await this.stg.setItem(user + '-contacts', new_contact);
  }

  /**
   * Add a user to the provided contacts list.
   * @param {string} user - The email of the user.
   * @param {string} name - The name of the user.
   * @param {Array} new_contact - The contacts list to which the user should be added.
   * @returns {number} The new length of the contacts list after adding the user.
   */
  addUserToContacts(user:string, name:string, new_contact: Contact[]): Contact[] {
    //   if(user !== 'guest') {
    //       let nameAlterd = name.charAt(0).toUpperCase() + name.slice(1);
    //       let ownContactData = {
    //           'title': nameAlterd,
    //           'email': user,
    //           'phone': "",
    //           'logogram': this.contacts.getLogogram(nameAlterd),
    //           'hex_color': this.contacts.getContactColor(),
    //       }
    //       new_contact.push(ownContactData);
    //   } 
      return new_contact;
    }

}
