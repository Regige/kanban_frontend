import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(private stg: StorageService, private rgst: RegisterService) { }


  /**
   * Toggles the visibility of elements based on their IDs and checks/unchecks the privacy policy checkbox.
   * @param {string} elementId - The ID of the primary element to toggle.
   * @param {string} elementIdNone - The ID of the secondary element to toggle.
   */
  toggleCheckmark(elementId:any, elementIdNone:any) {
    const element = document.getElementById(elementId);
    const elementNone = document.getElementById(elementIdNone);
    const checkbox = <HTMLInputElement>document.getElementById('privacyPolicyCheckbox');

    if (element && elementNone && checkbox)
    if (element.classList.contains('d-none')) {
        element.classList.remove('d-none');
        elementNone.classList.add('d-none');
        checkbox.checked = false;
    } else {
        element.classList.add('d-none');
        elementNone.classList.remove('d-none');
        checkbox.checked = true;
    }
  }


  /**
   * Toggles the visibility of the signup and login sections.
   * @param {string} action - Determines the action to take, either "show" or "hide".
   */
  showSignUpHideSignUp(action:string) {
      const signUpElement = document.getElementById('sign-up');
      const loginElement = document.getElementById('login');
      const forgotPasswordElement = document.getElementById('forgot-password-container');
      const passwordElement = document.getElementById('password-container');

      if (action === 'show') {
        if (signUpElement && loginElement) {
              signUpElement.classList.remove('d-none');
              loginElement.classList.add('d-none');
          }
      } else if (action === 'hide') {
        if (signUpElement && forgotPasswordElement && passwordElement && loginElement) {
              signUpElement.classList.add('d-none');
              forgotPasswordElement.classList.add('d-none');
              passwordElement.classList.add('d-none');
              loginElement.classList.remove('d-none');
          }
      }
  }


  /**
   * Toggles the visibility of the forgot password sections.
   * @param {string} mode - Determines the mode, either "forgot" or "reset".
   */
  showForgotPassword(mode:string) {
      if (mode === 'forgot') {
          document.getElementById('forgot-password-container')?.classList.remove('d-none');
          document.getElementById('login')?.classList.add('d-none');
      } else if (mode === 'reset') {
          document.getElementById('password-container')?.classList.remove('d-none');
          document.getElementById('forgot-password-container')?.classList.add('d-none');
          
      }
  }


  /**
   * Handles the submit action of the forgot password form and shows a popup upon success.
   */
  handleForgotPasswordFormSubmit() {
      let passwordEmail = <HTMLInputElement>document.getElementById('passwordEmail');
      if (passwordEmail)
      passwordEmail.value = '';

      document.getElementById('forgot-password-container')?.classList.add('d-none');
      document.getElementById('password-container')?.classList.remove('d-none');
      
      this.showPopupAndRedirect('Passwort erfolgreich zurückgesetzt', 'index.html');
      
      return false;
  }


  /**
   * Displays a basic alert with the given message.
   * @param {string} message - The message to display in the alert.
   */
  // showPopupAndRedirect(message:string) {
  //     alert(message);
  // }


  /**
   * Validates if two password fields have the same value.
   * @returns {boolean} Returns true if passwords match, false otherwise.
   */
  validatePasswords() {
      const password1 = <HTMLInputElement>document.getElementById('ForgotPassword1');
      const password2 = <HTMLInputElement>document.getElementById('ForgotPassword2');
      const errorMessage = document.getElementById('register-error2');

      if (password1 && password2 && password1.value !== password2.value) {
          
          this.showPopup('Your password does not match.')
          return false; // Verhindert das Absenden des Formulars
      } else {
        if (errorMessage)
          errorMessage.style.display = 'none';
          // Hier wird das Passwort zurückgesetzt
          return true; // Lässt das Formular absenden
      }
  }


  /**
   * Checks if the given email exists in the users list and toggles visibility of relevant sections.
   */
  checkUserEmail() {
      let passwordEmail = <HTMLInputElement>document.getElementById('passwordEmail');

      // let user = this.rgst.users.find(u => u.email === passwordEmail.value); 
      // if (user) {
      //     // Wenn der Benutzer in der Liste gefunden wurde
      //     document.getElementById('forgot-password-container')?.classList.add('d-none');
      //     document.getElementById('password-container')?.classList.remove('d-none');
      // } else {
          this.showPopup('This email address is not registered. Please check your input or register.');
      // }
  }


  /**
   * Handles the submit action of the forgot password form.
   * @returns {boolean} Always returns false to prevent form submission.
   */
  // handleForgotPasswordFormSubmit() {
  //   this.checkUserEmail();

  //     return false;
  // }

  /**
   * Validates if a user is defined. If not, redirects to the index page.
   */
  checkUserLogin() {
      if (this.stg.user == undefined) {
          console.log('fehler')
          this.openPage('index.html');
      }
  }

  /**
   * Redirects the browser to the specified page.
   * @param {string} page - The URL of the page to redirect to.
   */
  openPage(page:string) {
      window.location.href = page;
  }

  closeCurrentTab() {
      window.close();
  }

  /**
   * Sets the local storage with the data of a guest user.
   */
  setGuestUser() {
      this.stg.user = JSON.stringify('guest');
      localStorage.setItem('user', this.stg.user);
  }

  /**
   * Displays a popup with the given text and optionally redirects to a specified URL.
   * @param {string} text - The message to display in the popup.
   * @param {string} [url] - Optional. The URL to redirect to after the popup disappears.
   */
  showPopupAndRedirect(text:string, url:string) {
      // Zeige das Popup
      var popup = document.createElement("div");
      popup.textContent = text;
      popup.classList.add("popup");
      document.body.appendChild(popup);
      setTimeout(function () {
          popup.style.top = "30px";
      }, 100);
      setTimeout(function () {
          popup.style.top = "-100px";
          setTimeout(function () {
              document.body.removeChild(popup);
              // Nachdem das Popup verschwunden ist, leite zur angegebenen URL weiter
              if (url) {
                  window.location.href = url;
              }
          }, 500);
      }, 3000);
  }

  /**
   * This function generates a popup window which is displayed in the top center
   * 
   * @param {String} text text that should be displayed
   */
  showPopup(text:string) {
      var popup = document.createElement("div");
      popup.textContent = text;
      popup.classList.add("popup");
      document.body.appendChild(popup);
      setTimeout(function () {
          popup.style.top = "30px";
      }, 100);
      setTimeout(function () {
          popup.style.top = "-100px";
          setTimeout(function () {
              document.body.removeChild(popup);
          }, 500);
      }, 3000);
  }

  openHTML(html:string) {
      location.href = html;
  }

  // Header
  userNavbar() {
      let navbar = document.getElementById('navbar');
      if (navbar)
      if (navbar.classList.contains('d-none')) {
          navbar.classList.remove('d-none');
      } else {
          navbar.classList.add('d-none');
      }
  }
}
