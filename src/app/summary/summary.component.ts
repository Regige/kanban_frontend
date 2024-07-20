import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { StorageService } from '../services/storage.service';
import { ScriptService } from '../services/script.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {


summary_all = 0;                                            //resets everything
summary_task = [];                                          //resets everything
summary_urgent = 0;                                         //resets everything
summary_urgent_date = "";                                   //resets everything
date_time: number[] = [];                                             //resets everything

// window.addEventListener('resize', executeOnScreenWidthChange);  // Monitoring the screen width
screenWidthThreshold = 950;                                 // Screen resolution when the popup appears
lastScreenWidth = window.innerWidth;                        // Query the screen width at the start of the page
welcome_text: string = '';                                               // Set the welcome text variable

user_name = 'Guest';                                            // Sets the username


constructor(public stg: StorageService, public scp: ScriptService) {}



/**
 * This function initializes the summary page
 */



async initsummary() {
    await this.stg.loadUserData();
    this.scp.checkUserLogin();
    this.stg.loadFromLocalStorage();
    this.GreetingAfterTime();
    this.OneStartexecuteOnScreenWidthChange();
    this.loadSummaryTask();
    this.clacDateUrgent();
}

/** 
 * This function calculates what time of day it is. No parameters are required.
 * 
 */
GreetingAfterTime() {
    const jetzt = new Date();
    const stunde = jetzt.getHours();
    if (stunde >= 5 && stunde < 12) {
        this.welcome_text = "Good morning,";
    } else if (stunde >= 12 && stunde < 18) {
        this.welcome_text = "Good day,";
    } else {
        this.welcome_text = "Good evening,";
    }
    let summaryWelcomeText = document.getElementById('summary_welcome_text');
    if(summaryWelcomeText)
    summaryWelcomeText.innerHTML = this.welcome_text;

    let summaryWelcomeTextName = document.getElementById('summary_welcome_text_name');
    if(summaryWelcomeTextName)
    summaryWelcomeTextName.innerHTML = this.user_name;
}

/**
 * This function checks whether the device has a smaller screen resolution. Depending on this, a popup or a welcome message will be issued.
 * 
 */
OneStartexecuteOnScreenWidthChange() {
    if (this.lastScreenWidth <= this.screenWidthThreshold) {
        this.showPopupSlider();
        let summaryGretting = document.getElementById('summary_gretting');
        if(summaryGretting)
            summaryGretting.classList.add('summary_dn');
    } else {
        let summaryGretting = document.getElementById('summary_gretting');
        if(summaryGretting)
            summaryGretting.classList.remove('summary_dn');
    }
}

/**
 * This function calculates the current screen width and outputs it. In addition, a popup is generated as soon as the variable is smaller.
 * 
 */

executeOnScreenWidthChange() {
    const currentScreenWidth = window.innerWidth;
    if (this.lastScreenWidth < this.screenWidthThreshold && currentScreenWidth >= this.screenWidthThreshold) {
        let summaryGretting = document.getElementById('summary_gretting');
        if(summaryGretting)
            summaryGretting.classList.remove('summary_dn');
    } else if (this.lastScreenWidth >= this.screenWidthThreshold && currentScreenWidth < this.screenWidthThreshold) {
        this.showPopupSlider();
        let summaryGreeting = document.getElementById('summary_gretting');
        if(summaryGreeting)
            summaryGreeting.classList.add('summary_dn');
    }
    this.lastScreenWidth = currentScreenWidth;
}

/**
 * This function creates a popup with the respective logged in user.
 * 
 */

showPopupSlider() {
    let text = this.welcome_text + this.user_name;
    const popup = document.createElement("div");
    popup.className = "summary_popup";
    popup.innerHTML =
        `<div class="summary_fbccco">
    <div class="summary_greeting_font_top_popup" id="summary_welcome_text">${this.welcome_text}
    </div>
    <div class="summary_greeting_font_name_popup">
        ${this.user_name}
    </div></div>
    `;
    document.body.appendChild(popup);
    setTimeout(function () {
        popup.style.display = "none";
        popup.remove();
    }, 2000);
}

/**
 * This function loads and generates all data from the individual task
 */

loadSummaryTask() {
    let to_do = this.loadSummaryCategory('task_board', 'to_do');
    let in_progress = this.loadSummaryCategory('task_board', 'in_progress');
    let await_feedback = this.loadSummaryCategory('task_board', 'await_feedback');
    let done = this.loadSummaryCategory('task_board', 'done');
    let summary_all = to_do + in_progress + await_feedback + done;
    let urgent_all = this.loadSummaryCategory('priority', 'Urgent');
    this.createAllTaskCounter(to_do, in_progress, await_feedback, done, summary_all, urgent_all);
}

/**
 * This function counts all tasks based on the category. these will then be returned
 * 
 * @param {String} category path of the category
 * @param {String} task     the respective tasks
 * @returns                 returns the counted value
 */
loadSummaryCategory(category:string, task:string) {
    let task_counter = 0;
    for (let i = 0; i < this.stg.list.length; i++) {
        const element = this.stg.list[i];
        if (element.category.text === task)
            task_counter = task_counter + 1;
    }
    return task_counter;
}

/**
 * This function adds the determined values ​​to the respective tasks
 * 
 * @param {Number} to_do            determined number
 * @param {Number} in_progress      determined number
 * @param {Number} await_feedback   determined number
 * @param {Number} done             determined number
 * @param {Number} summary_all      determined number
 * @param {Number} urgent_all       determined number
 */
createAllTaskCounter(to_do:any, in_progress:any, await_feedback:any, done:any, summary_all:any, urgent_all:any) {
    let summaryToDo = document.getElementById('summary-to-do');
    if(summaryToDo)
        summaryToDo.innerHTML = to_do;
    let summaryInProgess = document.getElementById('summary-in-progess');
    if(summaryInProgess)
        summaryInProgess.innerHTML = in_progress;
    let summaryAwaitFeedback = document.getElementById('summary-await-feedback');
    if(summaryAwaitFeedback)
        summaryAwaitFeedback.innerHTML = await_feedback;
    let summaryDone = document.getElementById('summary-done');
    if(summaryDone)
        summaryDone.innerHTML = done;
    let summaryAllTasks = document.getElementById('summary-all-tasks');
    if(summaryAllTasks)
        summaryAllTasks.innerHTML = summary_all;
    let summaryUrgent = document.getElementById('summary-urgent');
    if(summaryUrgent)
        summaryUrgent.innerHTML = urgent_all;
}

/**
 * This function determines which high priority task is next
 */
clacDateUrgent() {
    for (let i = 0; i < this.stg.list.length; i++) {
        const element = this.stg.list[i];
        if (element.priority == 'Urgent') {
            this.date_time.push(Number(element.date.replaceAll("-", "")));
        }
    }
    this.date_time.sort(function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    if (this.date_time.length >= 1) {
        this.formatDateUrgent(this.date_time[0]);
    } else {
        this.formatDateUrgent(0);
    }
}

/**
 * 
This function formats a date into a number sequence
 * 
 * @param {String} date date output of add tasks
 */
formatDateUrgent(date:any) {
    if (date != 0) {
        let date_string = date.toString();
        let year = date_string.substr(0, 4);
        let month = date_string.substr(4, 2);
        let day = date_string.substr(6, 2);
        let urgentDate = document.getElementById('urgent-date');
        if(urgentDate)
            urgentDate.innerHTML = this.setMonth(month) + ' ' + day + ', ' + year;
    } else {
        let urgentDate = document.getElementById('urgent-date');
        if(urgentDate)
            urgentDate.innerHTML = '-';
    }
}

/**
 * This function determines the respective month and returns it as a string
 * 
 * @param {Number} month    Number of Month
 * @returns                 Returns month as a string
 */
setMonth(month:number) {
    if (month == 1) { return 'January' }
    if (month == 2) { return 'February' }
    if (month == 3) { return 'March' }
    if (month == 4) { return 'April' }
    if (month == 5) { return 'May' }
    if (month == 6) { return 'June' }
    if (month == 7) { return 'July' }
    if (month == 8) { return 'August' }
    if (month == 9) { return 'September' }
    if (month == 10) { return 'October' }
    if (month == 11) { return 'November' }
    if (month == 12) { return 'December' }
    return
}

/**
 * This function adds a picture change. The respective picture will be sent along with the delivery
 * 
 * @param {*} icon path of the icon
 */
summaryIconChangeHover(icon:string) {
    if (icon == 'pen_icon') {
        let summaryEditIcon = document.getElementById('summary_edit_icon') as HTMLImageElement;
        if(summaryEditIcon)
            summaryEditIcon.src = 'assets/img/pen_icon_withe.svg';
    }
    if (icon == 'check_icon') {
        let summaryCheckIcon = document.getElementById('summary_check_icon') as HTMLImageElement;
        if(summaryCheckIcon)
            summaryCheckIcon.src = 'assets/img/check_icon_withe.svg';
    }
}

/**
 * This function adds a picture change. The respective picture will be sent along with the delivery
 * 
 * @param {*} icon path of the icon
 */
summaryIconChangeOut(icon: string) {
    if (icon == 'pen_icon') {
        let summaryEditIcon = document.getElementById('summary_edit_icon') as HTMLImageElement;
        if(summaryEditIcon)
            summaryEditIcon.src = 'assets/img/pen_icon.svg';
    }
    if (icon == 'check_icon') {
        let summaryCheckIcon = document.getElementById('summary_check_icon') as HTMLImageElement;
        if(summaryCheckIcon)
            summaryCheckIcon.src = 'assets/img/check_icon.svg';
    }
}
  

}
