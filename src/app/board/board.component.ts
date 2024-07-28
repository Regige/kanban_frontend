import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ScriptService } from '../services/script.service';
import { AddTaskVarService } from '../services/add-task-var.service';
import { TouchService } from '../services/touch.service';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { ContactsPageService } from '../services/contacts-page.service';
import { RouterModule } from '@angular/router';
import { AddTaskService } from '../services/add-task.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { BoardService } from '../services/board.service';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskCardDialogComponent } from './task-card-dialog/task-card-dialog.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule, TaskCardComponent, TaskCardDialogComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

    error = '';

  constructor(public stg: StorageService, public scp: ScriptService, private taskVar: AddTaskVarService, public touch: TouchService, public contactsPg: ContactsPageService, public task: AddTaskService, private http: HttpClient, public data: DataService, public board: BoardService) {}


  /**
   * This function initializes the board page
   */
  async ngOnInit() {
    try {
        const rawContacts: any = await this.data.loadContacts();
        
        this.data.contacts = this.contactsPg.mapContacts(rawContacts);

        this.contactsPg.sortContactsList();

        const rawTasks: any = await this.data.loadTasks();
        
        this.data.tasks = this.board.mapTasks(rawTasks)
        console.log(this.data.tasks);
    } catch(e) {
        this.error = 'Fehler beim Laden!';
    }

  }



  /**
   * This function loads all Borad tasks
   */
//   async loadTaskBoard() {
//     //   this.stg.loadFromLocalStorage();
//     //   this.stg.loadFromLocalStorageContacts();
//       this.filterTaskBoard('to_do');
//       this.filterTaskBoard('in_progress');
//       this.filterTaskBoard('await_feedback');
//       this.filterTaskBoard('done');
//       // loadTouch(); touch muss noch als service impementiert werden
//   }

  /**
   * This function loads all individual tasks filtered
   * 
   * @param {String} task_board This string contains the individual tasks
   */
//   filterTaskBoard(task_board: string) {
//       let filter = this.data.tasks.filter(t => t['task_board'] == task_board);
//       if (filter.length) {
//         //   let taskBoard = document.getElementById('board_' + task_board);
//         //   if(taskBoard)
//         //     taskBoard.innerHTML = "";

//           for (let i = 0; i < filter.length; i++) {
//               const element = filter[i];
//               let priority_img = 'assets/img/task-prio-' + element.priority.charAt(0).toLowerCase() + '.svg';
//               let taskBoard = document.getElementById('board_' + task_board);
//               if(taskBoard) {
//                 //   if(element.id)
//                 //   taskBoard.innerHTML += this.boardHtml.createBoardTasks(element.id, element.category, element.title, element.text, priority_img);
//               //   this.loadBoardUsers(element.id, element.task_user);
//               //   this.loadBoardSubtasks(element.id, element.subtasks);
//               }
//           }
//       } else {
//         //   this.taskBoardEmpty(task_board);
//       }
//   }

  /**
   * This function loads an empty task if none exists
   * 
   * @param {String} task This string contains the individual tasks
   */
//   taskBoardEmpty(task: any, option?: boolean) {
//       let tasktext = document.getElementById(`board_${task}_headline`);

//       if(tasktext) {
//         if (option == false) {
//             let boardTask = document.getElementById('board_' + task);
//             if(boardTask) {
//               boardTask.innerHTML = `
//               <div class="board_no_task board_fbccco">No tasks ${tasktext.innerHTML}</div>`;
//             }
//         } else {
//             let boardTask = document.getElementById('board_' + task);
//             if(boardTask) {
//               boardTask.innerHTML += `
//               <div class="board_no_task board_fbccco">No tasks ${tasktext.innerHTML}</div>`;
//             }
//         }
//       }
//   }

  /**
   * This function loads all added users to the respective tasks
   * 
   * @param {Number} id           ID of the user in the task
   * @param {String} task_user    User task of the individual tasks
   */
//   loadBoardUsers(id: number, task_user: any) {
//       for (let i = 0; i < task_user.length; i++) {
//           const element = task_user[i];
//           let task_user_number = `task_user${id}`;
//           let taskUserNumber = document.getElementById(task_user_number);
//           // if(taskUserNumber)
//             // taskUserNumber.innerHTML += createBoardUsers(element.color, element.name);
//       };
//   }

  /**
   * This function loads all task to the respective tasks
   * 
   * @param {id} id           ID of the task 
   * @param {String} subtasks Sub task of the individual tasks
   */
//   loadBoardSubtasks(id: number, subtasks: any) {
//       var element_subtask = 0;
//       var element_percent = 0;
//       let subtask_number = `task_subtask${id}`;
//       for (let i = 0; i < subtasks.length; i++) {
//           const element = subtasks[i];
//           element_subtask = element_subtask + element.completed;
//           element_percent = element.completed + element_percent;
//       }
//       if (subtasks.length) {
//           let percent = (element_percent / subtasks.length) * 100;
//           // document.getElementById(subtask_number).innerHTML = createBoardSubtasks(element_subtask, subtasks.length, percent);
//       } else {
//           let taskSubtask = document.getElementById(subtask_number);
//           if(taskSubtask)
//             taskSubtask.innerHTML = "";
//       };
//   }



  /**
   * This function is a standard function from w3 schools which executes a drop event
   * 
   * @param {String} event Standard string from W3 schools
   */
  allowDrop(event: Event) {
      event.preventDefault();
  }

  /**
   * This function loads the respective Dropbox into the released Dropbox and saves it in the local storag
   * 
   * @param {String} category Submission of the task as a string
   */
  moveTo(category: any) {
      let index = this.stg.list.findIndex((task) => task.id === this.touch.draggedElement);
      this.stg.list[index]['task_board'] = category;
      this.stg.SaveInLocalStorageAndServer(this.stg.user, 'list', this.stg.list);
      this.ngOnInit()
    //   initBoard();
  }

  /**
   * This function lights up the Dropbox window
   * 
   * @param {Number} id ID of Box
   */
  highlight(id:any) {
    let element = document.getElementById(id);
    if(element)
    element.classList.add('board_box_highlight');
  }

  /**
   * This function removes the highlight of the Dropbox window
   * 
   * @param {Number} id ID of Box
   */
  removeHighlight(id: any) {
      let element = document.getElementById(id);
      if(element)
      element.classList.remove('board_box_highlight');
  }

  /**
   * This function starts the search function in the Board Task area
   */
  searchAllNote() {
      var search = document.getElementById('search_board') as HTMLInputElement;
      let searchInput = search.value.toLowerCase();
      let found = 0;
      for (let i = 0; i < this.stg.list.length; i++) {
          const element = this.stg.list[i];
        //   found = this.searchNote(element.id, searchInput, found, element.headline, element.text);
      };
  }

  /**
   * This function searches the entire task board for the input
   * 
   * @param {Number} i        ID in which task is being searched
   * @param {String} search   The search text
   * @param {Number} found    Indicates how many were found
   * @param {String} headline Search the heading
   * @param {String} text     Search the text
   * @returns                 returns the found element
   */
  searchNote(i: any, search: string, found: any, headline: string, text: string) {
      if (headline.toLowerCase().includes(search) || text.toLowerCase().includes(search)) {
          let element = document.getElementById(i);
          if(element)
            element.classList.remove('dn');
          found++;
      } else {
          let element = document.getElementById(i);
          if(element)
            element.classList.add('dn');
      };
      return found;
  }





  /**
   * This function deletes a task from the list based on the ID
   * 
   * @param {Number} id ID for Tasks
   */
//   deleteTask(id: number) {
//       if (this.stg.user != 'guest') {
//           for (let i = 0; i < this.stg.list.length; i++) {
//               const element = this.stg.list[i];
//               if (id == element.id) {
//                   this.stg.list.splice(i, 1);
//               }
//           }
//           this.stg.SaveInLocalStorageAndServer(this.stg.user, this.stg.listString, this.stg.list);
//         //   this.closeBoardCard();
//         //   this.loadTaskBoard();
//           this.scp.showPopup("Task deleted");
//       } else {
//           this.scp.showPopup('Cannot be deleted as a guest. Please create an account')
//       }
//   }

  addGuestTask() {
          if (this.stg.user == 'guest') {
              this.scp.showPopup('Cannot be deleted as a guest. Please create an account')
          }
  }

  /**
   * This function loads the board card detail view
   * 
   * @param {Number} id ID of TTasks
   */
  loadBoardCard(task: any, id: number) {
    this.board.clickedTask = task;
    this.board.showTaskDialog = true;

    let boardBody = document.getElementById('board_body');
      if(boardBody)
        boardBody.classList.add('board_fixed');

    // for (let i = 0; i < this.data.tasks.length; i++) {
    //       const element = this.data.tasks[i];
    //       if (element.id == id) {
            //   this.generateTaskData(element);
            //   let boardDetail = document.getElementById('board_detail');
            //   if(boardDetail)
                // boardDetail.innerHTML = createBoradCard(id, story, story_bg, headline, text, date, priority, priority_img);

            //   this.createBordCardUsers(id, element.task_user);

            //   this.createBordCardSubtasks(id, element.subtasks);
        //   }
    //   }
  }

  /**
   * This function loads the data of the selected task and then returns it
   * 
   * @param {String} element  Data for Task 
   * @returns                 returns the completed generated task
   */
//   generateTaskData(element: any) {
//       story = element.category.text;
//       story_bg = element.category.color;
//       headline = element.headline;
//       text = element.text;
//       date = element.date;
//       priority = element.priority;
//       priority_img = 'assets/img/task-prio-' + element.priority.charAt(0).toLowerCase() + '.svg';
//       return;
//   }

  /**
   * This function creates the associated users in the detail board map
   * 
   * @param {Number} id       ID for Card
   * @param {String} users    User for Card
   */
//   createBordCardUsers(id: any, users: any) {
//       let boardCardUsers = document.getElementById(`board-card-users${id}`);
//       if(boardCardUsers)
//         boardCardUsers.innerHTML = "";
//       if (users.length >= 1) {
//           let boardCardUsers = document.getElementById(`board-card-users${id}`);
//           if(boardCardUsers)
//             boardCardUsers.innerHTML = 'Assigned To:';
//           for (let i = 0; i < users.length; i++) {
//               const element = users[i];
//               let boardCardUsers = document.getElementById(`board-card-users${id}`);
//             //   if(boardCardUsers)
//                 // boardCardUsers.innerHTML += createBoardCardUsers(element.full_name, element.name, element.color)
//           }
//       }
//   }

  /**
   * This function creates the individual subtasks in the board task detail view
   * 
   * @param {Number} id           ID for Card
   * @param {String} subtasks     Subtask for Card
   */
//   createBordCardSubtasks(id: any, subtasks: string) {
//       let boardCardSubtasks = document.getElementById(`board-card-subtasks${id}`);
//       if(boardCardSubtasks)
//         boardCardSubtasks.innerHTML = "";
//       if (subtasks.length >= 1) {
//           let boardCardSubtasks = document.getElementById(`board-card-subtasks${id}`);
//           if(boardCardSubtasks)
//             boardCardSubtasks.innerHTML = 'Subtasks';
//           for (let i = 0; i < subtasks.length; i++) {
//               const element = subtasks[i];
//             //   if (element.completed == 1) {
//             //       var completed = '../img/Check button.svg';
//             //   } else {
//             //       var completed = '../img/Check button none.svg';
//             //   }
//               let boardCardSubtasks = document.getElementById(`board-card-subtasks${id}`);
//             //   if(boardCardSubtasks)
//                 // boardCardSubtasks.innerHTML += createBoardCardSubtaks(id, i, element.completed, element.text, completed);
//           }
//       }
//     //   this.loadBoardSubtasks(id, subtasks);
//   }


  /**
   * This function asks whether the individual substacks have already been completed. These are then saved locally
   * 
   * @param {Number} id ID of the Task
   * @param {*} i       ID of the Subtask
   * @param {*} status  status of the individual task
   */
//   toggelSubtaskCompleted(id: number, i: number, status: any) {
//       if (status == 1) {
//           this.stg.list[id].subtasks[i].completed = 0;
//       } else {
//           this.stg.list[id].subtasks[i].completed = 1;
//       }
//       this.createBordCardSubtasks(id, this.stg.list[id]['subtasks'])
//       this.stg.SaveInLocalStorageAndServer(this.stg.user, this.stg.listString, this.stg.list);
//   }






}
