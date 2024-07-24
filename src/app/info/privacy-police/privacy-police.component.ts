import { Component } from '@angular/core';
import { ScriptService } from '../../services/script.service';
import { HeaderComponent } from './../../shared/header/header.component';
import { SidebarComponent } from './../../shared/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-police',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: './privacy-police.component.html',
  styleUrl: './privacy-police.component.scss'
})
export class PrivacyPoliceComponent {


  constructor(public scp: ScriptService) {}
}
