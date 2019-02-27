import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@/services'

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<LoginComponent>) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  openRegister() {
    this.thisDialogRef.close('register');
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/user']);
        this.thisDialogRef.close();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
  }
}
