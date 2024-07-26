import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }



  mapTasks(rawTasks: any[]): Task[] {
      return rawTasks.map(task => ({
        id: task.id,
        title: task.title,
        text: task.text,
        task_user: task.assigned_to,
        date: task.date,
        priority: task.priority,
        category: task.category,
        subtasks: task.subtasks,
        task_board: task.task_board
      } as Task));
    }
}
