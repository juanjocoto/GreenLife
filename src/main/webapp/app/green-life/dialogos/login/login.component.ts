import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../../shared';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  isValid = true;
  msgError = 'Error al ingresar al sistema, verifique sus datos nuevamente';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  public login(form: NgForm) {
    this.loginService.login({
      username: form.controls['username'].value,
      password: form.controls['password'].value,
      rememberMe: false
    }).then((res) => {
      localStorage.setItem('greenlifetoken', res + '');
    }).catch(() => {
      this.isValid = false;
    });
  }

}
