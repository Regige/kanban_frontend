import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { DataService } from './data.service';
import { ScriptService } from './script.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  clickedTask: any = null;
  showTaskDialog = false;
  editTask = false;

  constructor(private data: DataService, private scp: ScriptService) { }


  setJSONforTask(obj: any) {
        return {
        id: obj.id,
        title: obj.title,
        text: obj.text,
        assigned_to: obj.assigned_to,
        due_date: obj.due_date,
        priority: obj.priority,
        category: obj.category,
        subtasks: obj.subtasks,
        task_board: obj.task_board
        }
  }



  mapTasks(rawTasks: any[]): Task[] {
      return rawTasks.map(task => ({
        id: task.id,
        title: task.title,
        text: task.text,
        assigned_to: task.assigned_to,
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
     this.editTask = false;
     this.clickedTask = null;


      let element = document.getElementById('board_body');
      if(element)
        element.classList.remove('board_fixed');
  }


  /**
   * This function deletes a task from the list based on the ID
   * 
   * @param {Number} id ID for Tasks
   */
  async deleteTask(id: number) {
      try {

        let resp = await this.data.deleteTaskInBackend(id);
        // console.log("Task deleted works: ", resp);
        this.closeBoardCard();
        let taskIndex = this.findTaskById(id);
        this.data.tasks.splice(taskIndex, 1);
        this.scp.showPopup("Task deleted");

      } catch(e) {
        console.error(e);
      }
  }



    /**
   * This function asks whether the individual substacks have already been completed. These are then saved locally
   * 
   * @param {Number} id ID of the Task
   * @param {*} i       ID of the Subtask
   * @param {*} status  status of the individual task
   */
  async toggelSubtaskCompleted(i: number, id:number, status: any) {

      let newStatus;

      if (status == 1) {
          this.clickedTask.subtasks[i].completed = 0;
          newStatus = 0;
      } else {
          this.clickedTask.subtasks[i].completed = 1;
          newStatus = 1;
      }

      let body = {
        completed: newStatus
      }

      try {
        let resp = await this.data.update_partiallySubtaskInBackend(id, body);
        console.log("Subtask wurde geändert", resp);

        let taskIndex = this.findTaskById(this.clickedTask.id);
        let selTask = this.data.tasks[taskIndex];
        if(selTask.subtasks)
        selTask.subtasks[i].completed = newStatus;

      } catch(e) {
        console.error(e);
      }
  }



  findTaskById(id: number) {
    const index = this.data.tasks.findIndex(item => item.id === id);
    return index
  }

  
}
