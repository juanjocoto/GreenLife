import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../../shared';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  isValid = true;
  msgError = 'Error al ingresar al sistema, verifique sus datos nuevamente';
  formulario: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  public login() {
    this.loginService.login({
      username:  this.formulario.get('username').value,
      password: this.formulario.get('password').value,
      rememberMe: false
    }).then((res) => {
      localStorage.setItem('greenlifetoken', res + '');
      this.isValid = true;
    }).catch(() => {
      this.isValid = false;
    });
  }

}
