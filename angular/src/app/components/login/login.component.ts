import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IAuthResponse, IUser } from '@/model';
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

    let user: IUser = {
      email : value.email,
      password: value.password
    }

    this.authService.login(user).subscribe( (resp: IAuthResponse) => {
      if(resp.status){
        this.router.navigate(['/user']);
        this.thisDialogRef.close();
      }else{
        this.errorMessage = resp.error;
      }
    })
  }
}
