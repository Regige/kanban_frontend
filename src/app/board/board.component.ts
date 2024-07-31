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
    this.touch.loadTouch();
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


  async savePartiallyUpdatedTask(category: string) {
    let body = {
        "task_board": category
    }
    let id = this.touch.draggedElement;

    try {
        let resp = await this.data.update_partiallyTaskInBackend(id, body);

    } catch(e) {
        console.error(e);
    }
  }


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
  moveTo(category: string) {
      let index = this.data.tasks.findIndex((task) => task.id === this.touch.draggedElement);
      this.data.tasks[index]['task_board'] = category;

        this.savePartiallyUpdatedTask(category);

    //   this.ngOnInit()
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
      for (let i = 0; i < this.data.tasks.length; i++) {
          const element = this.data.tasks[i];
          const text = element.text || '';
          found = this.searchNote(element.id, searchInput, found, element.title, text);
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
  }


}
