import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  clickedTask: any = null;
  showTaskDialog = false;

  constructor(private data: DataService) { }



  mapTasks(rawTasks: any[]): Task[] {
      return rawTasks.map(task => ({
        id: task.id,
        title: task.title,
        text: task.text,
        task_user: task.assigned_to,
        due_date: task.due_date,
        priority: task.priority,
        category: task.category,
        subtasks: task.subtasks,
        task_board: task.task_board
      } as Task));
    }


  getCategoryColor(category: string) {
    if(category === "Work")
      return '#1FD7C1'
    if(category === "Privat")
      return '#0038FF'
    if(category === "Shopping")
      return '#FF7A00'
    if(category === "Other")
      return '#FFBB2B'
    return '#FFBB2B'
  }


  /**
   * This function is needed to close a DIV container in the background
   * 
   * @param {String} event Standard string from W3 schools
   */
  notClose(event: Event) {
      event.stopPropagation();
  }


  /**
   * This function opens the detail boardtask view
   */
  closeBoardCard() {
     this.showTaskDialog = false;
     this.clickedTask = null;
    //   let boardDetail = document.getElementById('board_detail');
    //   if(boardDetail)
    //     boardDetail.innerHTML = "";
      // loadTaskBoard(); // war schon auskommentiert
      let element = document.getElementById('board_body');
      if(element)
        element.classList.remove('board_fixed');
  }


  /**
   * This function deletes a task from the list based on the ID
   * 
   * @param {Number} id ID for Tasks
   */
  deleteTask(id: number) {
      // if (this.stg.user != 'guest') {
      //     for (let i = 0; i < this.stg.list.length; i++) {
      //         const element = this.stg.list[i];
      //         if (id == element.id) {
      //             this.stg.list.splice(i, 1);
      //         }
      //     }
      //     this.stg.SaveInLocalStorageAndServer(this.stg.user, this.stg.listString, this.stg.list);
      //   //   this.closeBoardCard();
      //   //   this.loadTaskBoard();
      //     this.scp.showPopup("Task deleted");
      // } else {
      //     this.scp.showPopup('Cannot be deleted as a guest. Please create an account')
      // }
  }



    /**
   * This function asks whether the individual substacks have already been completed. These are then saved locally
   * 
   * @param {Number} id ID of the Task
   * @param {*} i       ID of the Subtask
   * @param {*} status  status of the individual task
   */
  toggelSubtaskCompleted(i: number, status: any) {

      if (status == 1) {
          this.clickedTask.subtasks[i].completed = 0;
      } else {
          this.clickedTask.subtasks[i].completed = 1;
      }

      // this.createBordCardSubtasks(id, this.stg.list[id]['subtasks'])
      // this.stg.SaveInLocalStorageAndServer(this.stg.user, this.stg.listString, this.stg.list);

      // speichern im Backend!
  }



  findTaskById(id: number) {
      const index = this.data.tasks.findIndex(item => item.id === id);
      return index
  }
  
}
