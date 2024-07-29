import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ScriptService } from './script.service';
import { Task } from '../interfaces/task';
import { AddTaskPageService } from './add-task-page.service';
import { Subtask } from '../interfaces/subtask';
import { AddTaskVarService } from './add-task-var.service';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private stg: StorageService, private scp: ScriptService, private taskPg: AddTaskPageService, private taskVar: AddTaskVarService) { }


//   taskPrio = "";
//   subtasks: Subtask[] = [];
//   taskBoardField: string = "";


  // Create new Task

  /**
   * This function starts the functions to create a new task.
   */

  async createNewTask() {
    //   if(this.stg.user === 'guest') {
    //       this.scp.showPopup('Cannot be saved as a guest. Please create an account');
    //       // closeNewContacts();
    //   } else {
        //   await this.defineNewTask();
        console.log()
    //   }
  }

  /**
   * This function defines the new Task values and calls all the neccessary functions.
   */

  async defineNewTask() {
      let taskTitle = document.getElementById('task-title');
      let taskDescription = document.getElementById('task-description');
      let assignedTo = this.getAssignedToUsers();
      let dueDate = document.getElementById('task-date');
      let taskCategory = this.getTaskCategory();
    //   let idIndex = this.getIdIndex();
      let taskBoard = this.getTaskBoardField();
      this.checkIfPrioIsSelected();
      
    //   await this.saveNewTask(taskTitle, taskDescription, assignedTo, dueDate, taskCategory, idIndex, taskBoard);
      this.resetTaskForm();
    //   this.removeStringFromLocalStorage();
      this.scp.showPopup('Task added to board');
      this.scp.openHTML('./board');
  }

  /**
   * This function saves the values from the form field and saves them as an object within the list array.
   * The list array is than saved in localStorage and on the server as well.
   * 
   * @param {string} taskTitle This variable is the name of the task
   * @param {string} taskDescription This variable is the description of the task
   * @param {object} assignedTo This variable is an array of all the assigned contacts
   * @param {string} dueDate This variable is the date of the task
   * @param {string} taskCategory This variable is the category of the task
   * @param {number} idIndex This variable is the given Id of the task
   * @param {string} taskBoard This variable is the name of the board where the task will be placed
   */

  async saveNewTask(taskTitle: any, taskDescription: any, assignedTo: any, dueDate: any, taskCategory: any, idIndex: any, taskBoard: any) {
      let newTask:Task = {
          'id':idIndex,
          'title': taskTitle.value,
          'text': taskDescription.value,
          'assigned_to': assignedTo,
          'due_date': dueDate.value,
          'priority': this.taskVar.taskPrio,
          'category': taskCategory,
          'subtasks': this.taskVar.subtasks,
          'task_board': taskBoard,
      }

      this.stg.list.push(newTask);

      await this.stg.SaveInLocalStorageAndServer(this.stg.user, this.stg.listString, this.stg.list);
  }


  /**
   * This function empties all the input fileds from the form element
   */

  resetTaskForm() {
    //   let taskTitle = document.getElementById('task-title') as HTMLInputElement;
    //   if(taskTitle)
    //   taskTitle.value = "";

    //   let taskDescription = document.getElementById('task-description') as HTMLInputElement;
    //   if(taskDescription)
    //   taskDescription.value = "";
    
      const checkboxes = document.querySelectorAll('[type="checkbox"]') as NodeListOf<HTMLInputElement>;
      checkboxes.forEach(checkbox => {
          checkbox.checked = false;
      });

      let taskAssignedToSelectedCon = document.getElementById('task-assigned-to-selected-con');
      if(taskAssignedToSelectedCon)
      taskAssignedToSelectedCon.innerHTML = "";

    //   let taskDate = document.getElementById('task-date') as HTMLInputElement;
    //   if(taskDate)
    //   taskDate.value = "";

      if(this.taskVar.taskPrio) {
        let prioBtn = document.getElementById(`prio-bt-${this.taskVar.taskPrio}`) as HTMLInputElement;
        if(prioBtn) {
          prioBtn.removeAttribute('style');
        }
        this.taskVar.taskPrio = "";
      }

    //   let category = document.getElementById('category') as HTMLInputElement;
    //   if(category)
    //   category.value = "";

    //   let taskSubText = document.getElementById('task-sub-text');
    //   if(taskSubText)
    //   taskSubText.innerHTML = "";

      this.taskVar.subtasks = [];
  }

  /**
   * This function saves the checked contacts with their additional information within an object
   * and than inside the array assignedTo.
   * 
   * @returns An array of all the choosen contacts
   */

  getAssignedToUsers() {
      let assignedTo:any = [];
      document.querySelectorAll('[type="checkbox"]').forEach(item => {
          if((item as HTMLInputElement).checked === true) {
              let itemSib = item.previousElementSibling;
              if(itemSib) {
                let divIcon = itemSib.firstElementChild  as HTMLElement;

                if(divIcon) {
                //   assignedTo.push({
                //       'full_name': (item as HTMLInputElement).value,
                //       'color': divIcon.style.backgroundColor,
                //       'name': divIcon.innerHTML,
                //   });
                    assignedTo.push(Number(divIcon.id));
                }
              }
          
          } 
      });
      return assignedTo;
  }


  /**
   * This function assigns the right color to the category and saves it within an object.
   * 
   * @returns An object with the task category and its corresponding color
   */

  getTaskCategory() {
      let taskCategoryValue = document.getElementById('category') as HTMLInputElement;
      let color;

      if(taskCategoryValue.value === "Work") {
          color = '#1FD7C1'
      } if(taskCategoryValue.value === "Privat") {
          color = '#0038FF'; 
      } if(taskCategoryValue.value === "Shopping") {
          color = '#FF7A00';
      } if(taskCategoryValue.value === "Other") {
          color = '#FFBB2B';
      };

      let taskCategory = {
          'text': taskCategoryValue,
          'color': color
      };
      return taskCategory;
  }

  /**
   * This function sets a Id. First a array of all the excisting Id's is created. 
   * Than the array listOfIds is sorted form lowest number to highest. 
   * 
   * @returns The function getFreeIdIndex(listOfIds) returns a Id which is not given yet.
   */

//   getIdIndex() {
//       let listOfIds = [];

//       for (let i = 0; i < this.stg.list.length; i++) {
//           const task = this.stg.list[i];
//               listOfIds.push(task['id']);
//       } 

//     //   listOfIds.sort(function(a, b) {
//     //       return a - b;
//     //       });

//       return this.getFreeIdIndex(listOfIds);
//   }

  /**
   * This function checks the not given Id's through a for loop and returns a number is not used yet.
   * 
   * @param {number} listOfIds This variable is a array of Id's form the list array.
   * @returns The function getFreeIdIndex(listOfIds) returns a Id which is not given yet.
   */

//   getFreeIdIndex(listOfIds: any) {
//       for (let j = 0; j < listOfIds.length; j++) {
//           if(j != listOfIds[j]) {
//               return j;
//           }
//       }

//       if(listOfIds.length !== 0) {
//           return listOfIds.length;
//       } else {
//           return 0;
//       }
//   }



  /**
   * This function checks whether variable taskPrio is defined. Else defines it.
   * 
   * @returns If variable is defined
   */
  checkIfPrioIsSelected() {
      if(this.taskVar.taskPrio !== "" ) {
          return this.taskVar.taskPrio;
      } else {
            return 'Medium';
      }
  }

  /**
   * This function sets the global variable taskPrio with the content of prio and 
   * calls setPrioButtonColor(prio).
   * 
   * @param {string} prio This variable stands for the choosen priority.
   */

  setTaskPrio(prio: string) {
      this.taskVar.taskPrio = prio;

      this.setPrioButtonColor(prio);
  }

  /**
   * This function sets the color to the according prio.
   * 
   * @param {string} prio This variable stands for the choosen priority.
   */

  setPrioButtonColor(prio: string) {
      let prios = ['Urgent', 'Medium', 'Low'];
      for (let i = 0; i < prios.length; i++) {
          const prioSgl = prios[i];
          let prioBtn = document.getElementById(`prio-bt-${prioSgl}`);
          if(prioBtn)
          prioBtn.removeAttribute('style');
      }

      let prioButton = document.getElementById(`prio-bt-${prio}`);
      
      if(prioButton) {
        if(prio == 'Urgent') {
            prioButton.style.backgroundColor = "#ff3d00";
            prioButton.style.color = "white";
        }
        if(prio == 'Medium') {
            prioButton.style.backgroundColor = "#ffa800";
            prioButton.style.color = "white";
        }
        if(prio == 'Low') {
            prioButton.style.backgroundColor = "#7AE129";
            prioButton.style.color = "white";
        };

      }
  }

  /**
   * This function saves the board category in localStorage. On the board page the add new task buttons
   * will call this function to save a board category.
   * 
   * @param {string} fieldCategory This variable is the name of the board category
   */

  saveStringInLocalStorage(fieldCategory: string) {
      localStorage.setItem('fieldCategory', fieldCategory);
  }

  /**
   * This function loads at the beginning of initalizing the page the value. 
   */

  loadStringFromLocalStorage() {   
    this.taskVar.taskBoardField = localStorage.getItem('fieldCategory') ?? "";
  }

  /**
   * This function will delete the what is saved in localStorage with the key 'fieldCategory'.
   */

  removeStringFromLocalStorage() {
    localStorage.removeItem('fieldCategory');
    this.taskVar.taskBoardField = "";
  }

  /**
   * This function returns a value depending on what is defined in taskBoardField.
   * 
   * @returns A string which defines the board catergory
   */

  getTaskBoardField() {
      if(this.taskVar.taskBoardField === "") {
          return "to_do";
      } else {
          return this.taskVar.taskBoardField;
      }
  }



  // Edit Task

  /**
   * This function starts the edit function for regular users or shows a popup for 
   * guest users
   * 
   * @param {number} id This variable is the assigned id of the task
   */

  editTask(id: number) {
      if(this.stg.user === 'guest') {
          this.scp.showPopup('Cannot be changed as a guest. Please create an account');
          // closeNewContacts();
      } else {
          this.insertInputValues(id);
      }
  }

  /**
   * This function calls changeBoardDetailCard() to change the appearance of the card
   * and inserts the input values
   * 
   * @param {number} id This variable is the assigned id of the task
   */

  insertInputValues(id: number) {
          let index = this.getIndexTaskEdit(id);
          if(index) {
            this.changeBoardDetailCard(id, index);
            let task = this.stg.list[index];
            let taskTitle = document.getElementById('task-title') as HTMLInputElement;
            let taskDescription = document.getElementById('task-description') as HTMLInputElement;
            let dueDate = document.getElementById('task-date') as HTMLInputElement;
            let taskCategory = document.getElementById('category') as HTMLInputElement;
            this.taskVar.taskPrio = task['priority'];
  
            this.setPrioButtonColor(this.taskVar.taskPrio);
            this.saveSubtasksListEdit(task);
            // this.taskPg.renderInputText();
  
            taskTitle.value = task['title'];
            taskDescription.value = task['text'] ?? "";
            dueDate.value = task['due_date'];
            taskCategory.value = task['category']; 
          }
  }


  /**
   * This function changes the appearance of the card to a form element
   */

  changeBoardDetailCard(id: number, i:number) {
          let boardDetailBoxCon = document.getElementById('board_detail_box_content');
          let cardStroy = document.getElementById(`Card_story${id}`); 
          let editButton = document.getElementById('board_card_bt_edit');
          let boardCardBtnDelete = document.getElementById('board_card_bt_delete');
          if(boardCardBtnDelete) {
            boardCardBtnDelete.innerHTML = "";
          }
          if(boardDetailBoxCon) {
            boardDetailBoxCon.innerHTML = "";
          }
          if(cardStroy) {
            cardStroy.innerHTML = "";
          }
          if(editButton){
            editButton.innerHTML = "";
          }
          
          let formContainer = document.createElement("form");
          let subButton = document.createElement("input");

        //   formContainer.innerHTML = this.taskHtml.createAddTask();
          if(boardDetailBoxCon) {
            boardDetailBoxCon.appendChild(formContainer);
          }
          formContainer.appendChild(subButton);

          this.changeBoardAttribute(id, i, formContainer, subButton, );
          this.changeBoardStyle(subButton, cardStroy, formContainer);
  }

  /**
   * This function sets attributes to the elements 
   * 
   * @param {number} id This variable is the assigned id of the task
   * @param {number} i This variable is the task index in the list array
   * @param {*} formContainer 
   * @param {*} subButton 
   */

  changeBoardAttribute(id: number, i: number, formContainer: any, subButton: any) {
          formContainer.setAttribute('onsubmit', `changeTask(${id}, ${i}); return false`);
          formContainer.setAttribute('id', 'edit-task-form');
          subButton.setAttribute('type', 'submit');
          subButton.setAttribute('value', 'OK');
  }

  /**
   * This function sets styles to the elements
   * 
   * @param {*} subButton 
   * @param {*} cardStroy 
   * @param {*} formContainer 
   */

  changeBoardStyle(subButton: any, cardStroy: any, formContainer: any) {
          subButton.classList.add('task-button');
          subButton.classList.add('task-bt-create');
          subButton.classList.add('task-bt-change');
          cardStroy.classList.remove('board_detail_header');
          formContainer.style = 'overflow-y:scroll; height:68vh;';

          let boardDetailCard =  document.getElementById('board_detail_card');
          if(boardDetailCard) {
            boardDetailCard.style.paddingBottom = '60px';
          }
          let taskInputLeft = document.getElementById('task-input-left');
          if (taskInputLeft) {
              taskInputLeft.style.width = '100%';
          }
          let taskInputRight = document.getElementById('task-input-right');
          if (taskInputRight) {
              taskInputRight.style.width = '100%';
          }
          let taskHr = document.getElementById('task-hr');
          if (taskHr) {
              taskHr.classList.add('d-none');
          }
  }

  /**
   * This function gets the tasks index 
   * 
   * @param {number} id This variable is the assigned id of the task
   * @returns The index of the task within the list array
   */

  getIndexTaskEdit(id: number) {
          for (let i = 0; i < this.stg.list.length; i++) {
              const task = this.stg.list[i];
              if(id == task['id']) {
                  return i;
              }
          };
          return;
  }


  /**
   * This function saves the subtasks in the global array subtasks
   * 
   * @param {object} task 
   */

  saveSubtasksListEdit(task:Task) {
          this.taskVar.subtasks = [];
          let taskSubtasks = task['subtasks'];
          if(taskSubtasks)
          for (let j = 0; j < taskSubtasks.length; j++) {
              const subtask = taskSubtasks[j];
                  this.taskVar.subtasks.push(subtask);
          }
  }

  /**
   * 
   * @param {number} id This variable is the assigned id of the task
   * @param {number} i This variable is the task index in the list array
   */

  async changeTask(id: number, i: number) {
      let taskTitle = document.getElementById('task-title') as HTMLInputElement;
      let taskDescription = document.getElementById('task-description') as HTMLInputElement;
      let assignedTo = this.getAssignedToUsersEditTask(i);
      let dueDate = document.getElementById('task-date') as HTMLInputElement;
      let taskCategory = this.getTaskCategory(); 
      let taskBoard = this.stg.list[i]['task_board'];

      await this.saveChangedTask(id, i, taskTitle.value, taskDescription.value, assignedTo, dueDate.value, taskCategory, taskBoard);
      // closeBoardCard();
      this.scp.showPopup('Task changed');
      // loadTaskBoard();
  }

  /**
   * This function saves the values within the variable changedTask and replaces the old task
   * with the new inside the list array. Than everything is saved in localStorage and on the server agian.
   * 
   * @param {number} id This variable is the assigned id of the task
   * @param {number} i This variable is the task index in the list array
   * @param {string} taskTitle This variable is the task title
   * @param {string} taskDescription This variable is the task text
   * @param {object} assignedTo This variable is the task assigned users in an object
   * @param {string} dueDate This variable is the due date
   * @param {object} taskCategory This varibale is the category the task is assigned to
   * @param {string} taskBoard This varibale is the category for the board fields
   */

  async saveChangedTask(id: number, i: number, taskTitle: string, taskDescription: string, assignedTo: any, dueDate: string, taskCategory: any, taskBoard: string) {
          let changedTask = {
          'id':id,
          'title': taskTitle,
          'text': taskDescription,
          'task_user': assignedTo,
          'due_date': dueDate,
          'priority': this.taskVar.taskPrio,
          'category': taskCategory,
          'subtasks': this.taskVar.subtasks,
          'task_board': taskBoard,
      }

      this.stg.list.splice(i, 1, changedTask);
      await this.stg.SaveInLocalStorageAndServer(this.stg.user, this.stg.listString, this.stg.list);
  }

  /**
   * This function gets the assigned to users by either the checkbox input or
   * if it wasn't changed, by the saved values inside the task object.
   * 
   * @param {number} i This variable is the task index in the list array
   * @returns A object with the assigned to users
   */

  getAssignedToUsersEditTask(i: number) {
      let assignedToUser = this.getAssignedToUsers(); 
      let assignedTo: any = [];
      if(assignedToUser.length === 0) {
          let taskUsers = this.stg.list[i]['assigned_to']
          if(taskUsers)
          for (let j = 0; j < taskUsers.length; j++) {
              const sglContacts = taskUsers[j];
              assignedTo.push(sglContacts);
          }
          return assignedTo;
      } else {
          return assignedToUser;
      }
  }
}
