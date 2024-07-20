import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScriptService } from '../../services/script.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public scp: ScriptService, public stg: StorageService) {}
}
