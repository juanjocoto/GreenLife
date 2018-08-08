import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginService } from '../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  isValid = true;
  msgError = 'Error al ingresar al sistema, verifique sus datos nuevamente';
  formulario: FormGroup;

  constructor(private dialog: MatDialog, private loginService: LoginService,
    private formBuilder: FormBuilder, private route: Router, private snackBar: MatSnackBar) { }

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
    }).then(() => {
      this.isValid = true;
      this.snackBar.open('Acceso Permitido', undefined, { duration: 3000 });
      this.dialog.closeAll();
      this.route.navigate(['']);
    }).catch(() => {
      this.isValid = false;
    });
  }

}
