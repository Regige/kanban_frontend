import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ScriptService } from './script.service';
import { ContactsPageService } from './contacts-page.service';
import { AddTaskVarService } from './add-task-var.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AddTaskPageService {

  constructor(private stg: StorageService, private scp: ScriptService, private contactsPg: ContactsPageService, private taskVar: AddTaskVarService, private data: DataService) { }


  // Add Task page functionality

  /**
   * This function starts the functions to load all the necessary data
   */
  // ------ This Funktion is inside add-task componente ----- 
  // async function initAddTask() {
  //     loadAddTaskForm();
  //     await loadUserData();
  //     loadFromLocalStorage();
  //     loadFromLocalStorageContacts();
  //     loadStringFromLocalStorage();
  // }


  // Load Add Task Form Element

//   loadAddTaskForm() {
//       let addTaskForm = document.getElementById('task-input-con');
//       if(addTaskForm) {
//         addTaskForm.innerHTML = "";
//         addTaskForm.innerHTML = this.taskHtml.createAddTask();
//         this.preventPastDate();
//       }
//   }

  //  Assigned To Field - render Contacts list 

  /**
   * This function handles the appearance of the assigned to Button
   */

  showAssignedToBt() {
      let taskContactsListToAssign = document.getElementById('task-contacts-list-to-assign');
      if(taskContactsListToAssign) {
        taskContactsListToAssign.classList.remove('d-none');
        // if(!this.data.contacts) {
        //     taskContactsListToAssign.innerHTML = "";
        //     taskContactsListToAssign.innerHTML = /*html*/`<p>&emsp; No contacts yet</p>`;
        // } else {
        //     // this.contactsPg.sortContactsList();
        //     this.renderAssignedToBt();
        // }
      }

    //   let addNewContactBt = document.getElementById('add-new-contact-bt');
    //   if(addNewContactBt) {
    //     addNewContactBt.classList.remove('d-none');
    //   }

  }

  /**
   * This function generates the html code for the assigned to Button with all the saved contacts.
   */

//   renderAssignedToBt() {
//       let contactsListToAssignCon = document.getElementById('task-contacts-list-to-assign');
//       if(contactsListToAssignCon) {
//         contactsListToAssignCon.innerHTML = "";
//         for (let i = 0; i < this.stg.contacts.length; i++) {
//             const contact = this.stg.contacts[i];
            
//             contactsListToAssignCon.innerHTML += this.taskHtml.createAssignedToBt(i, contact);
//         }
//       }
//   }


  //  Assigned To Field - Popup and Close Function 

  /**
   * This function closes the container with all the contacts listed.
   */

  closeAssignedToField() {
      let listOfContactsToAssigne = document.getElementById('task-contacts-list-to-assign');
      if(listOfContactsToAssigne) {
      listOfContactsToAssigne.classList.add('d-none');
    //   let addNewContactBt = document.getElementById('add-new-contact-bt');
    //   if(addNewContactBt)
    //     addNewContactBt.classList.add('d-none');
      }
  }

  /**
   * This function stops closeAssignedToField() from closing when clicked on that particular element.
   * 
   * @param {*} event 
   */

  stopClosing(event: Event) {
      event.stopPropagation();
  }



  addEventListenersToCheckboxes() {
      const checkboxes = document.querySelectorAll('[type="checkbox"]');
      checkboxes.forEach(checkbox => {
          checkbox.addEventListener('change', this.handleCheckboxChange);
      });
  }


  handleCheckboxChange(event: any) {
      const checkbox = event.target;
      if(checkbox) {
        let itemSib = checkbox.previousElementSibling;
        let divIcon = itemSib.firstElementChild;

        const selectedContainer = document.getElementById('task-assigned-to-selected-con');

        if (checkbox.checked) {
            const contactDiv = document.createElement('div');
            contactDiv.id = `selected-${checkbox.id}`;
            contactDiv.style.backgroundColor = divIcon.style.backgroundColor;
            contactDiv.style.height = "32px";
            contactDiv.style.width = "32px";
            contactDiv.style.borderRadius = "50px";
            contactDiv.style.marginRight = "12px";
            contactDiv.style.marginTop = "4px";
            contactDiv.style.color = "white";
            contactDiv.style.display = "flex";
            contactDiv.style.justifyContent = "center";
            contactDiv.style.alignItems = "center";
            contactDiv.style.zIndex = "0";
            // contactDiv.className = 'task-contacts-color-icon-selected';
            contactDiv.innerText = divIcon.innerHTML;
            if(selectedContainer)
            selectedContainer.appendChild(contactDiv);
        } else {
            const contactDiv = document.getElementById(`selected-${checkbox.id}`);
            if (contactDiv) {
                if(selectedContainer)
                selectedContainer.removeChild(contactDiv);
            }
        }
        }
  }



  // subtask input field

  /**
   * This function opens the subtext input by clicking on the subtask Button.
   */

  changeToSubText() {
      let subtaskButtonOpen = document.getElementById('task-sub-bt-open');
      if(subtaskButtonOpen)
      subtaskButtonOpen.classList.add('d-none');
      let subtaskInputText = document.getElementById('task-sub-input-text-con');
      if(subtaskInputText)
      subtaskInputText.classList.remove('d-none');
  }

  /**
   * This function deletes the input value.
   */

  deleteInputText() {
      let taskSubInputText =  document.getElementById('task-sub-input-text') as HTMLInputElement;
      if(taskSubInputText)
      taskSubInputText.value = "";
  }

  /**
   * This function saves the input value as an object in newSubtask and than within the array subtasks.
   */

  saveInputText() {
      let subtaskInput = document.getElementById('task-sub-input-text') as HTMLInputElement; 

      let newSubtask = {
          "title": subtaskInput.value,
          "completed": 0
      }
      this.taskVar.subtasks.push(newSubtask);
      subtaskInput.value = "";

    //   this.renderInputText();
  }

  /**
   * The new subtask within the subtasks array is generated under the subtask Button
   */

//   renderInputText() {
//       let subtaskTextCon = document.getElementById('task-sub-text');
//       if(subtaskTextCon) {
//         subtaskTextCon.innerHTML = "";
  
//         for (let i = 0; i < this.taskVar.subtasks.length; i++) {
//             const subtask = this.taskVar.subtasks[i];
            
//             subtaskTextCon.innerHTML += this.taskHtml.createInputText(i, subtask);
//         }
//       }
//   }

  /**
   * This function delets the subtask form the subtasks array and starts the
   * renderInputText() function again.
   * 
   * @param {number} i This is the index of the subtask
   */

  deleteSubtask(i: number) {
      this.taskVar.subtasks.splice(i,1);

    //   this.renderInputText();
  }

  /**
   * This fuction opens a new input field with the value of the choosen subtask to be changed.
   * 
   * @param {number} i This is the index of the subtask
   */

  editSubtask(i: number) {
      let subtaskField = document.getElementById(`subtask-field-${i}`);
      if(subtaskField)
      subtaskField.classList.remove('d-none');
      let subtaskLi = document.getElementById(`subtask-li-${i}`);
      if(subtaskLi)
      subtaskLi.classList.add('d-none');
      let subtaskInputField = document.getElementById(`subtask-input-field-${i}`) as HTMLInputElement;
      if(subtaskInputField)
      subtaskInputField.value = this.taskVar.subtasks[i]['title'];
  }

  /**
   * This function saves the changed input value and renders the subtasks again.
   * 
   * @param {number} i This is the index of the subtask
   */

  saveEditedSubtask(i: number) {
      let subtaskInputField = document.getElementById(`subtask-input-field-${i}`) as HTMLInputElement;
      this.taskVar.subtasks[i]['title'] = subtaskInputField.value;

      let subtaskField = document.getElementById(`subtask-field-${i}`);
      if(subtaskField)
      subtaskField.classList.add('d-none');
      let subtaskLi = document.getElementById(`subtask-li-${i}`);
      if(subtaskLi)
      subtaskLi.classList.remove('d-none');

    //   this.renderInputText();
  }


  /**
   * This function sets the min value for the date input field. 
   */
  preventPastDate(){
      const dtToday = new Date();
  
      let month: string | number = dtToday.getMonth() + 1;
      let day: string | number = dtToday.getDate();
      let year = dtToday.getFullYear();
      if(month < 10)
          month = '0' + month.toString();
      if(day < 10)
      day = '0' + day.toString();
      let maxDate = year + '-' + month + '-' + day;

      let taskDate = document.getElementById('task-date');
      if(taskDate)
      taskDate.setAttribute('min', maxDate);
  }

}
