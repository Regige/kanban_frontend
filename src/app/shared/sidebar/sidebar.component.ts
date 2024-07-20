import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {


  constructor(public scp: ScriptService) {}
}
