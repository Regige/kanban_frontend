import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ScriptService } from './script.service';
import { ContactsPageService } from './contacts-page.service';
import { Contact } from '../interfaces/contact';
import { AddTaskService } from './add-task.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private stg: StorageService, private scp: ScriptService, private contactsPg: ContactsPageService, private task: AddTaskService) { }

  // Create new Contact

  /**
   * This function starts the necessary functions to create and save a new contact
   */

  async createNewContact() {
      if(this.stg.user === 'guest') {
          this.scp.showPopup('Cannot be created as a guest. Please create an account');
          this.contactsPg.closeNewContacts();
      } else {
          await this.saveNewContact();
      }
  }

  async saveNewContact() {
      let contactName = document.getElementById('popup-contact-name') as HTMLInputElement;
      let contactEmail = document.getElementById('popup-contact-email') as HTMLInputElement;
      let contactPhone = document.getElementById('popup-contact-phone');
      let contactColor = this.getContactColor();
      let contactNameAlterd = contactName.value.charAt(0).toUpperCase() + contactName.value.slice(1);
      let logogram = this.getLogogram(contactNameAlterd);
      
      await this.saveNewContactValues(contactNameAlterd, contactEmail, contactPhone, logogram, contactColor);
      this.resetForm(contactName, contactEmail, contactPhone);
      this.contactsPg.closeNewContacts();

      if ( document.URL.includes("add_task.html") || document.URL.includes("board.html")) {
          if(document.URL.includes("add_task.html")) {
          this.contactsPg.sortContactsList();
          // renderAssignedToBt();
          }
      } else {
          this.updateContactsPage(contactNameAlterd);
      };

      this.scp.showPopup('Contact succesfully created');
  }

  /**
   * This function saves the input form createNewContact() into an object and than into the contacts array.
   * The variable contacts is than save in localStorage and on the server.
   * 
   * @param {string} contactNameAlterd This varable is the name of the new contact
   * @param {string} contactEmail This varable is the email of the new contact 
   * @param {string} contactPhone This varable is the phone number of the new contact
   * @param {string} logogram This varable is the logogram of the new contacts icon
   * @param {string} contactColor This varable is the color of the new contacts icon
   */

  async saveNewContactValues(contactNameAlterd: any, contactEmail: any, contactPhone: any, logogram: any, contactColor:any) {
      let newContact: Contact = {
          'name': contactNameAlterd,
          'email': contactEmail.value,
          'phone': contactPhone.value,
          'logogram': logogram,
          'hex_color': contactColor
      };

      this.stg.contacts.push(newContact);
      await this.stg.SaveInLocalStorageAndServer(this.stg.user, this.stg.contactsString, this.stg.contacts);
  }

  /**
   * This function empties the input fields 
   * 
   * @param {string} contactName This varable is the name of the new contact 
   * @param {string} contactEmail This varable is the email of the new contact  
   * @param {string} contactPhone This varable is the phone number of the new contact 
   */

  resetForm(contactName: any, contactEmail: any, contactPhone: any) {
      contactName.value = "";
      contactEmail.value = "";
      contactPhone.value = "";
  }
  
  /**
   * This function creats the logogram form the name
   * 
   * @param {string} name This variable is the name of the contact
   * @returns The first letters of the fist and last name
   */
  getLogogram(name: string) {
      let firstCha = name.toString().charAt(0);
      let secondCha = name.toString().trim().split(" ").splice(-1).toString().charAt(0);

      return firstCha + secondCha;
  }

  /**
   * This function chooses randomly a color form the hexColor array
   * 
   * @returns A color code
   */
  getContactColor() {
      let randomColor = this.contactsPg.hexColors[Math.floor(Math.random()*this.contactsPg.hexColors.length)];
      return randomColor;
  }

  /**
   * This function calls the render and showContact functions to show the changes
   *  that have been made.
   * 
   * @param {string} contactNameAlterd This variable is the name of the contact
   */
  updateContactsPage(contactNameAlterd: string) {
      this.contactsPg.renderContacts();
      let index;
          
      for (let i = 0; i < this.stg.contacts.length; i++) {
          const contact = this.stg.contacts[i];
          const contactName = contact['name'];
          if(contactNameAlterd === contactName) {
                  index = i;
          }
      }

      if(index)
      this.contactsPg.showContact(index);
  }


  // Delete Contacts

  /**
   * This function starts the functions to remove a contact form the contacts array and saves the changes.
   * 
   * @param {number} i This is the index of a contact
   */
  async deleteContacts(i: number) {
      if(this.stg.user === 'guest' || this.stg.user === this.stg.contacts[i]['email']) {
          if (this.stg.user === 'guest') {
              this.scp.showPopup('Cannot be deleted as a guest. Please create an account');
          } else {
              this.scp.showPopup('Cannot be deleted.');
          }
          this.contactsPg.closeNewContacts();
      } else {
      this.deleteFromList(i);
      this.stg.contacts.splice(i,1);

      await this.stg.SaveInLocalStorageAndServer(this.stg.user, this.stg.contactsString, this.stg.contacts);
      this.contactsPg.renderContacts();
      this.contactsPg.closeNewContacts();
      this.removeFromMainPage();
      this.scp.showPopup('Contact deleted');
      }
  }


  /**
   * This function empties the html content form the container
   */
  removeFromMainPage() {
      let contactClicked = document.getElementById('contact-clicked');
      if (contactClicked)
        contactClicked.innerHTML = "";
  }


  /**
   * This function looks for the tasks with the deleted contact and
   * deletes the contact form that task
   * 
   * @param {number} i This variable is the index of the contact
   */
  deleteFromList(i: number) {
      let contactName = this.stg.contacts[i]['name'];

      for (let j = 0; j < this.stg.list.length; j++) {
          const task = this.stg.list[j];
          const users = task['task_user'];

          if (users)
          for (let k = 0; k < users.length; k++) {
              const user = users[k];
              
              if(user['full_name'] === contactName) {
                  this.changeUsersInTask(users, k, task, j);
              }
          }
      }
  }


  /**
   * This function defines all the elements of the choosen task again and removes the 
   * choosen task_user. Than everything is send to saveChangedTask function.
   * 
   * @param {object} users 
   * @param {number} k This varibale is the index of user within the task_user object
   * @param {object} task 
   * @param {number} j This variable is the index of the task within the list array
   */

  changeUsersInTask(users:any, k:number, task:any, j:number) {
      users.splice(k,1);

      let id = task['id'];
      let taskTitle = task['headline'];
      let taskDescription = task['text'];
      let assignedTo = users;
      let dueDate = task['date'];
      this.task.taskPrio = task['priority'];
      let taskCategory = task['category'];
      this.task.subtasks = task['subtasks'];
      let taskBoard = task['task_board'];

      this.task.saveChangedTask(id, j, taskTitle, taskDescription, assignedTo, dueDate, taskCategory, taskBoard);    
  }

  // Save changed contact

  /**
   * This function starts the functions to change a contact within the contacts array and saves the changes.
   * 
   * @param {number} i This is the index of the contact
   */

  async saveChangedContact(i: number) {
      if(this.stg.user === 'guest' || this.stg.user === this.stg.contacts[i]['email']) {
          if (this.stg.user === 'guest') {
              this.scp.showPopup('Cannot be changed as a guest. Please create an account');
          } else {
              this.scp.showPopup('Cannot be changed.');
          }
          this.contactsPg.closeNewContacts();
      }
      else {
      await this.saveChangedContactFunctions(i);
      }
  }

  /**
   * This functin calls all the functions to save the changes.
   */

  async saveChangedContactFunctions(i: number) {
      let contactName = document.getElementById('popup-contact-name') as HTMLInputElement;
      let contactEmail = document.getElementById('popup-contact-email');
      let contactPhone = document.getElementById('popup-contact-phone');
      let contactNameAlterd = contactName.value.charAt(0).toUpperCase() + contactName.value.slice(1)
      let logogram =this.getLogogram(contactNameAlterd);
      let contactColor = this.getContactColor();

      await this.saveContactValues(i, contactEmail, contactPhone, contactNameAlterd, logogram, contactColor);
      this.contactsPg.renderContacts();
      this.resetForm(contactName, contactEmail, contactPhone);
      this.contactsPg.closeNewContacts();
      this.contactsPg.showContact(i);
      this.scp.showPopup('Contact changed');
  }

  /**
   * This function saves the input values in an object and changes the contacts array. Everyting is 
   * saved in localStorage and on the server again.
   * 
   * @param {number} i This variable is the index of the contact
   * @param {string} contactName This variable is the name of the contact
   * @param {string} contactEmail This variable is the emai of the contact
   * @param {string} contactPhone This variable is the phone number of the contact
   * @param {string} contactNameAlterd This variable is the alterd name of the contact
   * @param {string} logogram This variable is the logogram of the contact
   * @param {string} contactColor This variable is the color for the contacts icon
   */

  async saveContactValues(i: number, contactEmail: any, contactPhone: any, contactNameAlterd: any, logogram: any, contactColor: any) {
      let newContact = {
          'name': contactNameAlterd,
          'email': contactEmail.value,
          'phone': contactPhone.value,
          'logogram': logogram,
          'hex_color': contactColor
      };

      this.stg.contacts.splice(i, 1, newContact);
      await this.stg.SaveInLocalStorageAndServer(this.stg.user, this.stg.contactsString, this.stg.contacts);
  }

}
