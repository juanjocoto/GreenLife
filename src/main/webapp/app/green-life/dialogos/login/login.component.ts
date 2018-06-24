import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  isValid = true;
  msgError = '';

  constructor() { }

  ngOnInit() {
  }

  public login(form: NgForm) {
    const data = {
      'correo': form.controls['correo'].value,
      'contrasena': form.controls['contrasena'].value
    };
    console.log(data);
  }

}
