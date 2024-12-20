import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Contact } from '../interfaces/contact';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsPageService {

  constructor(private stg: StorageService, private data: DataService) { }

  // Contacts page functionality

//   letters: string[] = [];       // Variable (renderContacts()) to render contacts list letters
    PopupContact = false;
    clickedContact: any = null;
    editContact: boolean = false;
  allContacts = [];       // Variable for function createContact()
  hexColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646',
                '#FF9633', '#8B45FF', '#7C82FF', '#FF8DFC', '#FFD345', '#2DE9D7', '#5C47A6', '#FF7E7E',
                '#FFA64E', '#AD63FF', '#9DA8FF', '#FF9AFD', '#FFE14D', '#4EEBCF', '#6B5BC1', '#FF6666',
                '#FFC074', '#C685FF', '#B6C4FF', '#FFB6FE', '#FFF47E', '#62F3E5'];   // Variable for contact icon


  // show contacts list on the side

  /**
   * This function starts all the necessary functions to run the contacts.html
   */
  // ------ Diese Funktion befindet sich jetzt in der contact componente ------
  // async initContacts() {
  //     await loadUserData();
  //     loadFromLocalStorage();
  //     loadFromLocalStorageContacts();
  //     renderContacts();
  // } 

  /**
   * This function starts all the functions to generate the contact list on the left side of the page
   */

//   renderContacts() {
//       if(this.stg.contacts) {
//       let contactsList = document.getElementById('contacts-list');
//       if (contactsList) {
//         contactsList.innerHTML = "";
//       }
//       this.letters = [];
//       this.sortContactsList();

//       for (let i = 0; i < this.stg.contacts.length; i++) {
//           const contact = this.stg.contacts[i];
//           let firstCha = contact['logogram'].charAt(0);
//           let myData = "";
//           this.checkContactsListLetter(firstCha, contactsList);
//           if(this.stg.user === contact['email']){
//               myData = "(me)";
//           } 
//           this.renderContactsHTML(contactsList, i, contact, myData);
//       }}
//   }




    setJSON(obj: any) {
        return {
        id: obj.id,
        title: obj.title,
        email: obj.email,
        phone: obj.phone,
        hex_color: obj.hex_color,
        logogram: obj.logogram
        }
    }


    mapContacts(rawContacts: any[]): Contact[] {
      return rawContacts.map(contact => ({
        id: contact.id,
        title: contact.title,
        email: contact.email,
        phone: contact.phone,
        hex_color: contact.hex_color,
        logogram: contact.logogram
      } as Contact));
    }



  /**
   * This function sorts the elements in the contacts array alphabetically
   */

  sortContactsList() {
      this.data.contacts = this.data.contacts.sort((a,b) => {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
  }

  /** 
   * This function creates the subdivision of the generated contact list on the page
   *  by adding the first letter in a alphabetically order between the contacts */

//   checkContactsListLetter(firstCha: string, contactsList: any) {
//       if(!this.letters.includes(firstCha)) {
//       this.letters.push(firstCha);
//       this.renderContactsListLetters(firstCha, contactsList);
//       }
//   }

  /**
   * This function generates the html code for the subdivision within the contacts list on the page
   * 
   * @param {string} firstCha This variable is the letter which divides the contacts 
   * @param {*} contactsList This variable is the container where all the contacts are generated in
   * @returns It returns the html code for the divison within the contacts list
   */

//   renderContactsListLetters(firstCha:string, contactsList: any) {
//       return contactsList.innerHTML += this.contactsHtml.createContactsListLetters(firstCha);
//   }

  /**
   * This function generates the html code for the contacts list on the contact page
   * 
   * @param {*} contactsList This variable is the container where all the contacts are generated in
   * @param {number} i This variable is the index of the current contact
   * @param {object} contact This variable is the current contact form the contacts array
   * @returns It returns the html code
   */

//   renderContactsHTML(contactsList:any, i: number, contact: any, myData: any) {
//       return contactsList.innerHTML += this.contactsHtml.createContactsHTML(i, contact, myData);
//   }



  // show clicked contact on the main page

  /**
   * This function is responsible for showing the clicked contact on the right side of the contact page
   * 
   * @param {number} i This is the index of the current contact
   */

//   showContact(i: number) {
//       let contact = this.stg.contacts[i];
//       let clickedContact = document.getElementById('contact-clicked');
//       if(clickedContact) 
//       clickedContact.innerHTML = "";

//       if (window.matchMedia("(max-width: 700px)").matches) {
//       document.getElementById('contacts-main')?.classList.remove('d-none-700');
//       document.getElementById('contacts-list-section')?.classList.add('d-none');
//       }
//       this.renderSglContactHTML(i, contact, clickedContact);
//   }



    showContact(contact: any) {
        this.clickedContact = contact;
    }

  /**
   * This function creates the html code to show the clicked contact.
   * 
   * @param {number} i This variable is the index of the current contact
   * @param {object} contact This variable is the clicked contact
   * @param {*} clickedContact This variable is the container where the contact will be generated
   */

//   renderSglContactHTML(i: number, contact: Contact, clickedContact: any) {
//           clickedContact.innerHTML = this.contactsHtml.createSglContactHTML(i, contact);
//           if(this.stg.user === this.stg.contacts[i]['email']) {
//               document.getElementById('contact-bt-con-edit-delete')?.classList.add('d-none');
//               document.getElementById('contact-info-phone')?.classList.add('d-none');
//           }
//   }

  /**
   * This function is used to show or hide the clicked contact, depending on the window size of the page.
   */

  backToContactsList() {
      document.getElementById('contacts-main')?.classList.add('d-none-700');
      document.getElementById('contacts-list-section')?.classList.remove('d-none');
  }

  // window.addEventListener("resize", function() {
  //     if (window.matchMedia("(min-width: 701px)").matches && document.URL.includes("contacts.html")) {
  //     document.getElementById('contacts-list-section').classList.remove('d-none');
  //   } 
  //     if (window.matchMedia("(max-width: 700px)").matches && document.URL.includes("contacts.html")) {
  //     document.getElementById('contacts-main').classList.add('d-none-700');
  //   } 
  // })



  // Button + PopUp (For Add new contacts)

  /**
   * This function starts the right function to either show the popup window for adding new contacts 
   * or changing excisting contacts.
   * 
   * @param {number} filter This varible is the id of the contact. If it is empty, the function to 
   * create new contacts is being called.
   */

  showPopupContact(filter:number = -1) {
    //   this.renderPopupContact();
        this.PopupContact = true;
      let filterPlusOne = filter + 1;
      if(filterPlusOne >= 1){
          this.editContact = true;
          this.showPopupExistContact(filter);
      } 
          this.showPopupContactContainer();
  }

  /**
   * This function generates the html code for the popup window to create a new contact
   */

//   renderPopupContact() {
//       let addNewContactsPopup = document.getElementById('contacts-add-bg');
//       if(addNewContactsPopup)
//       addNewContactsPopup.innerHTML = this.contactsHtml.createPopupContact();
//   }

  /**
   * This function is responsible to show the popup background
   */

  showPopupContactContainer() {
      document.getElementById('contacts-add-bg')?.classList.remove('d-none');
      setTimeout(this.showPopupContactContent, 0)
  }

  /**
   * This function is responsible to show the popup window
   */

  showPopupContactContent() {
      document.getElementById('contacts-add-con')?.classList.add('contacts-add-con-show');
  }

  /**
   * This function closes the popup window
   */

  closeNewContacts() {
    this.PopupContact = false;
    this.editContact = false;
      let overlayBg = document.getElementById('contacts-add-bg');
      if(overlayBg)
      overlayBg.classList.add('d-none');

      let overlayCon = document.getElementById('contacts-add-con');
      if(overlayCon)
      overlayCon.classList.remove('contacts-add-con-show');
  }

  /**
   * This function stops the function closeNewContacts() from closing the popup window
   * 
   * @param {*} event 
   */

  stopClosing(event:any) {
      event.stopPropagation();
  }



  //  Button + PopUp (Change existing contact)

  /**
   * This function changes the renderPopupContact() function and creats the html code for an excisting 
   * contact popup window.
   * 
   * @param {number} i This variable is the index of the clicked contact
   */

  showPopupExistContact(i: number) {
      let popupContactHeader = document.getElementById('popup-contact-header');
      if(popupContactHeader)
      popupContactHeader.innerHTML = "Edit contact";

      let popupContactP = document.getElementById('popup-contact-p');
      if(popupContactP)
      popupContactP.innerHTML = "";
     
      let popupContactName = document.getElementById('popup-contact-name') as HTMLInputElement;
      if (popupContactName)
      popupContactName.value = this.clickedContact.title;

      let popupContactEmail = document.getElementById('popup-contact-email') as HTMLInputElement;
      if(popupContactEmail)
      popupContactEmail.value = this.clickedContact.email; 

      let popupContactPhone = document.getElementById('popup-contact-phone') as HTMLInputElement;
      if(popupContactPhone)
      popupContactPhone.value = this.clickedContact.phone; 
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
      let randomColor = this.hexColors[Math.floor(Math.random()*this.hexColors.length)];
      return randomColor;
  }



findContactById(id: number) {
      const index = this.data.contacts.findIndex(item => item.id === id);;
      return index
  }

}
