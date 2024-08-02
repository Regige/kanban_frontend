import { Component } from '@angular/core';
import { ScriptService } from '../services/script.service';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // first_name = '';
  // last_name = '';
    newUser = {
    username: '',
    email: '',
    password: '',
    password2: ''
  }

  constructor(public scp: ScriptService, public registerS: RegisterService, private router: Router, private as: AuthService) {}



    async registerNewUser(form: NgForm) {
      // let registerBtn = document.getElementById('registerBtn') as HTMLInputElement;

      
      let checkbox = document.getElementById('privacyPolicyCheckbox') as HTMLInputElement;
      if(checkbox.checked) {
        
        let body = {
          // "first_name": this.first_name,
          // "last_name": this.last_name,
          "username": this.newUser.username,
          "email": this.newUser.email,
          "password": this.newUser.password,
          "password2": this.newUser.password2
          }
          
        try { 
          // if (registerBtn)
          // registerBtn.disabled = true;
          let resp: any = await this.as.register(body);
  
          console.log("Neuer User wurde registriert: ", resp);
          form.resetForm();
          this.scp.toggleCheckmark('check-sign-up', 'check-none-sign-up');
          // registerBtn.disabled = false;
          this.router.navigateByUrl('/login');
        } catch(e) {
          // registerBtn.disabled = false;
          console.error(e);
        }
      }
  }

}
