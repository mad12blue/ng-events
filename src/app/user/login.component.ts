import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em { float: right; color: #E05C65; padding-left: 10px }
  `]
})
export class LoginComponent {

  userName: string | undefined;
  password: string | undefined;
  mouseoverLogin = false;
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: any) {
    this.authService.loginUser(formValues.userName, formValues.password)
      .subscribe(res => {
        if(!res) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      });
  }

  cancel() {
    this.router.navigate(['events']);
  }
       
}
