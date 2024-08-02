import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ScriptService } from '../../services/script.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public scp: ScriptService, public stg: StorageService, private router: Router, private as: AuthService
  ) {}


  async logoutUser() {
    try {
      let resp: any = await this.as.logout();
      console.log("User wurde ausgeloggt: ", resp);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    } catch(e) {
      console.error(e);
    }
  }
}
