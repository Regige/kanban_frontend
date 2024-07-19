import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { SummaryComponent } from './summary/summary.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ContactsComponent } from './contacts/contacts.component';

export const routes: Routes = [
    // { path: 'login', component: },
    { path: '', component: SummaryComponent},
    { path: 'board', component: BoardComponent},
    { path: 'add_task', component: AddTaskComponent},
    { path: 'contacts', component: ContactsComponent},
    // { path: 'help', component: HelpComponent},
    // { path: 'imprint', component: ImprintComponent},
    // { path: 'privacy-police', component: PrivacyPoliceComponent}
];
