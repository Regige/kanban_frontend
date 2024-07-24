import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { SummaryComponent } from './summary/summary.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PrivacyPoliceComponent } from './info/privacy-police/privacy-police.component';
import { HelpComponent } from './info/help/help.component';
import { ImprintComponent } from './info/imprint/imprint.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    // { path: '', component: SummaryComponent},
    // { path: 'summary', component: SummaryComponent},
    { path: 'board', component: BoardComponent},
    { path: 'add_task', component: AddTaskComponent},
    { path: 'contacts', component: ContactsComponent},
    // { path: 'help', component: HelpComponent},
    { path: 'imprint', component: ImprintComponent},
    { path: 'privacy-police', component: PrivacyPoliceComponent},
    { path: 'help', component: HelpComponent}
];
