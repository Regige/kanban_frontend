import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './../../shared/header/header.component';
import { SidebarComponent } from './../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {

}
