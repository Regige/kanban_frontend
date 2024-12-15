import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }



  STORAGE_TOKEN = '8A3U4MK7U3QQZFIE9YT3HJC3MLRAQ8J3J7J4DZ5Y';           //The tocken to the server storage
  STORAGE_URL = 'https://remote-storage.developerakademie.org/item';    //The URL to the server storage
  user:string = "";                                                                   // Creation of users variable
  list: Task[] = [];                                                                   //Creation of list variable
  contacts: Contact[] = [];                                                               //Creation of contact variable
  listString = 'list';                                                    //Creation of liststring variable
  contactsString = 'contacts';                                            //Creation of contactstring variable


/**
 * This function saves data on the server under a key
 * 
 * @param {String} key  Key for storing
 * @param {JSON} value  JSON to key
 * @returns             returns a status
 */
async setItem(key:string, value:any) {
    const payload = { key, value, token: this.STORAGE_TOKEN };
    return fetch(this.STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/**
 * This function loads data from the server. The key must be set here
 * 
 * @param {String} key   Key for storing
 * @returns         return a JSON
 */
async getItem(key: string) {
    const url = `${this.STORAGE_URL}?key=${key}&token=${this.STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `${key} not found`;
    });
}


/**
 * This function saves the user data in the local storage and on the server
 * 
 * @param {String} users        User
 * @param {String} keyString    key as string
 */
async SaveDataInLocalStorageFromServer(users:any, keyString:string) {
    let data = await JSON.parse(await this.getItem(users + `-${keyString}`));
    let dataAsText = JSON.stringify(data);
    localStorage.setItem(keyString, dataAsText);
}


/**
 * This function saves the user data in the local storage and on the server
 * 
 * @param {String} users        User
 * @param {String} keyString    key as string
 * @param {String} dataObject   dataobject as string
 */
async SaveInLocalStorageAndServer(users:any, keyString:string, dataObject:any) {
    let dataAsText = JSON.stringify(dataObject); // variable list or contacts 
    localStorage.setItem(keyString, dataAsText);
    await this.setItem(users + `-${keyString}`, dataObject);
}

/**
 * This function loads the tasks data
 */
loadFromLocalStorage() {            
    let listAsText = localStorage.getItem('list');
    if (listAsText) {
        this.list = JSON.parse(listAsText);
    }
}

/**
 * This function loads the contact data
 */
loadFromLocalStorageContacts() {
    let dataAsText = localStorage.getItem('contacts');
    if (dataAsText) {
        this.contacts = JSON.parse(dataAsText);
    }
}

/**
 * This function loads the logged in user. If the user is a guest, the guest user is loaded
 */
async loadUserData() {
    // debugger;
    let userAktiv = localStorage.getItem('user');
    let user_name_Aktiv = localStorage.getItem('name');
    if (userAktiv) {
        this.user = JSON.parse(userAktiv);
        // let user_name = JSON.parse(user_name_Aktiv); // woher kommt user_name???
        // if (user_name == null) {
        //     user_name = 'Guest'
        // }
        await this.SaveDataInLocalStorageFromServer(this.user, this.listString);
        await this.SaveDataInLocalStorageFromServer(this.user, this.contactsString);
    }
}

/**
 * This function deletes the local storage
 */
clearLocalStorage() {
    localStorage.clear();
}

}
