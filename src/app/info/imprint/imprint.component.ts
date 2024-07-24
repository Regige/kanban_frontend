import { Component } from '@angular/core';
import { ScriptService } from '../../services/script.service';
import { HeaderComponent } from './../../shared/header/header.component';
import { SidebarComponent } from './../../shared/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {


  constructor(public scp: ScriptService) {}
}
