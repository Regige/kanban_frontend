import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TouchJsService {



  /**
 * Set variables for touch function
 */
empty_box = 136;        //empty box height
box = 325;              //Boxing distance height
distance_top = 280;     //Absolute boxing distance from above
toDo_top: any;               //top edge of toDo
toDo_buttom: any;            //bottom edge of toDo
inProgress_top: any;         //top edge of inProgress
inProgress_buttom: any;      //bottom edge of inProgress
awaitFeedback_top: any;      //top edge of awaitFeedback
awaitFeedback_buttom: any;    //bottom edge of awaitFeedback
done_top: any;               //top edge of done
down_buttom: any;            //bottom edge of done
task: any;                   //number of total tasks
toDo: any;                   //number of tasks
inProgress: any;             //number of tasks
awaitFeedback: any;          //number of tasks
done: any;                   //number of tasks
toDoPos: any;                //Calculated position from the task
inProgressPos: any;          //Calculated position from the task
awaitFeedbackPos: any;       //Calculated position from the task
donePos: any;                //Calculated position from the task


  constructor() { }



// /**
//  * This function starts the initialization of the tocu function
//  */

// loadTouch() {
//     task = document.querySelectorAll('.board_note');
//     toDo = document.querySelector('.board_to_do');
//     inProgress = document.querySelector('.board_in_progress');
//     awaitFeedback = document.querySelector('.board_await_feedback');
//     done = document.querySelector('.board_done');
//     toDoPos = toDo.getBoundingClientRect();
//     inProgressPos = inProgress.getBoundingClientRect();
//     awaitFeedbackPos = awaitFeedback.getBoundingClientRect();
//     donePos = done.getBoundingClientRect();
//     task.forEach(addStart);
// }


// /**
//  * This function start the touch function
//  * 
//  * @param {String} elem element of the touch object
//  */
// addStart(elem) {
//     elem.addEventListener('touchstart', e => {
//         counter = calcCounterTasks();
//         noTasksTouch(elem.id);
//         calcPositionTasks();
//         let startX = e.changedTouches[0].clientX;
//         let startY = e.changedTouches[0].clientY;
//         touchMove(elem,startX,startY);
//         touchEnd(elem);
//     });
// }



// /**
//  * This function controls the current position of the touch object. it is also styled
//  * 
//  * @param {String} elem     element of the touch object
//  * @param {Number} startX   X position of the touch object
//  * @param {Number} startY   Y position of the touch object
//  */

// touchMove(elem,startX,startY){
//     elem.addEventListener('touchmove', eve => {
//             eve.preventDefault();
//             autoSrcoll(elem.getBoundingClientRect().top);
//             let nextX = eve.changedTouches[0].clientX;
//             let nextY = eve.changedTouches[0].clientY;
//             elem.style.left = nextX - startX + 'px';
//             elem.style.top = nextY - startY + 'px';
//             ist_position = window.scrollY + elem.getBoundingClientRect().top;
//             touchElementStyle(elem);
//             touchHighlight();
//         });
// }


// /**
//  * This function ends the touch function
//  * 
//  * @param {String} elem element of the touch object
//  */

// touchEnd(elem){
//     elem.addEventListener('touchend', eve => {
//             checkTouchEnd(elem);
//             SaveInLocalStorageAndServer(user, 'list', list);
//             loadTaskBoard();
//             console.log(elem)
//         });
// }


// /**
//  * This function styles the touch object
//  * 
//  * @param {String} elem element of the touch object
//  */
// touchElementStyle(elem){
//             elem.style.border = '1px solid black';
//             elem.style.opacity = '0.9';
//             elem.style.zIndex = 10;
//             elem.style.position = 'absolute';
//             elem.style.overflow = 'hidden';
// }

// /**
//  * This function shows which task you are currently on and highlights it
//  */
// touchHighlight() {
//     if (ist_position >= toDo_top && ist_position <= toDo_buttom) {
//         highlight('board_to_do');
//     } else {
//         removeHighlight('board_to_do');
//     }
//     if (ist_position >= inProgress_top && ist_position <= inProgress_buttom) {
//         highlight('board_in_progress');
//     } else {
//         removeHighlight('board_in_progress');
//     }
//     if (ist_position >= awaitFeedback_top && ist_position <= awaitFeedback_buttom) {
//         highlight('board_await_feedback');
//     } else {
//         removeHighlight('board_await_feedback');
//     }
//     if (ist_position >= done_top && ist_position <= done_buttom) {
//         highlight('board_done');
//     } else {
//         removeHighlight('board_done');
//     }
// }


// /**
//  * This function checks at the end of the touch function in which field it should be placed
//  * 
//  * @param {String} elem The elmenet which is to be filed
//  */
// checkTouchEnd(elem) {
//     if (ist_position >= toDo_top && ist_position <= toDo_buttom) {
//         list[elem.id].task_board = 'to_do';
//         removeHighlight('board_to_do');
//     }
//     if (ist_position >= inProgress_top && ist_position <= inProgress_buttom) {
//         list[elem.id].task_board = 'in_progress';
//         removeHighlight('board_in_progress');
//     }
//     if (ist_position >= awaitFeedback_top && ist_position <= awaitFeedback_buttom) {
//         list[elem.id].task_board = 'await_feedback';
//         removeHighlight('board_await_feedback');
//     }
//     if (ist_position >= done_top && ist_position <= done_buttom) {
//         list[elem.id].task_board = 'done';
//         removeHighlight('board_done');
//     }
// }


// /**
//  * This function calculates which space in the list is occupied
//  * 
//  * @returns  Here it is calculated which place in the list is occupied and returns it
//  */
// calcCounterTasks() { //hier wird erechnet welcher platz in der Liste belegt ist
//     counter_to_do = 0;
//     conter_in_progress = 0;
//     counter_await_feedback = 0;
//     counter_done = 0;
//     for (let i = 0; i < list.length; i++) {
//         const element = list[i];
//         calcCounterAllTasks(element);
//     }
//     return [counter_to_do, conter_in_progress, counter_await_feedback, counter_done];
// }

// /**
//  * In this function it is clarified how many tasks are in the respective task
//  * 
//  * @param {String} element the complete jsan array for counting
//  */
// calcCounterAllTasks(element) {
//     if (element.task_board == 'to_do') {
//         counter_to_do = counter_to_do + 1;
//     }
//     if (element.task_board == 'in_progress') {
//         conter_in_progress = conter_in_progress + 1;
//     }
//     if (element.task_board == 'await_feedback') {
//         counter_await_feedback = counter_await_feedback + 1;
//     }
//     if (element.task_board == 'done') {
//         counter_done = counter_done + 1;
//     }
// }

// /**
//  * This function determines the absolute height for the touch event
//  */
// calcPositionTasks() {
//     calcPositionTasksToDo(0);
//     calcPositionTasksInProgess(1);
//     calcPositionTasksAwaitFeedback(2);
//     calcPositionTasksDone(3);
// }

// /**
//  * This function determines the respective distance to the function
//  * 
//  * @param {Number} index Index for the element that is moved
//  */
// calcPositionTasksToDo(index) {
//     console.log('hier')
//     if (counter[index] == 0) {
//         toDo_top = distance_top;
//         toDo_buttom = distance_top + empty_box;
//     } else {
//         toDo_top = distance_top;
//         toDo_buttom = distance_top + box;
//     }
// }

// /**
//  * This function determines the respective distance to the function
//  * 
//  * @param {Number} index Index for the element that is moved
//  */
// calcPositionTasksInProgess(index) {
//     if (counter[index] == 0) {
//         inProgress_top = toDo_buttom;
//         inProgress_buttom = toDo_buttom + empty_box;
//     } else {
//         inProgress_top = toDo_buttom;
//         inProgress_buttom = toDo_buttom + box;
//     }
// }

// /**
//  * This function determines the respective distance to the function
//  * 
//  * @param {Number} index Index for the element that is moved
//  */
// calcPositionTasksAwaitFeedback(index) {
//     if (counter[index] == 0) {
//         awaitFeedback_top = inProgress_buttom;
//         awaitFeedback_buttom = inProgress_buttom + empty_box;
//     } else {
//         awaitFeedback_top = inProgress_buttom;
//         awaitFeedback_buttom = inProgress_buttom + box;
//     }
// }

// /**
//  * This function determines the respective distance to the function
//  * 
//  * @param {Number} index Index for the element that is moved
//  */
// calcPositionTasksDone(index) {
//     if (counter[index] == 0) {
//         done_top = awaitFeedback_buttom;
//         done_buttom = awaitFeedback_buttom + empty_box;
//     } else {
//         done_top = awaitFeedback_buttom;
//         done_buttom = awaitFeedback_buttom + box;
//     }
// }



// /**
//  * This function checks whether tasks are in the respective category
//  * 
//  * @param {Number} id  Number of categories
//  */

// noTasksTouch(id) {
//     for (let i = 0; i < list.length; i++) {
//         const element = list[i];
//         if (element.id == id) {
//             if (element.task_board == 'to_do') {
//                 counter[0] = counter[0] - 1;
//             }
//             if (element.task_board == 'in_progress') {
//                 counter[1] = counter[1] - 1;
//             }
//             if (element.task_board == 'await_feedback') {
//                 counter[2] = counter[2] - 1;
//             }
//             if (element.task_board == 'done') {
//                 counter[3] = counter[3] - 1;
//             }
//         }
//     }
// }


// /**
//  * This function calculates the value where the touch is currently located. Based on this position, the image will be scrolled up or down
//  * 
//  * @param {Number} position Position of the touch
//  * @returns                 Returns the determined value
//  */
// autoSrcoll(position) {
//     let distance = 200;
//     let window_height = window.innerHeight - distance;
//     if (position <= distance && window.scrollY >= 0) {
//         console.log('oben')
//         Y = window.scrollY - 50;
//         //console.warn('top', window.scrollY);
//         scrollTo(0, Y);
//     }
//     if (position >= window_height && window.scrollY <= window_height) {
//         console.log('unten')
//         Y = window.scrollY + 50;
//         // console.warn('buttom', window.scrollY);
//         scrollTo(0, Y);
//     }
//     return scrollY;
// }
// }
