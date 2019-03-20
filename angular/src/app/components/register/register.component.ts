import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@/services';
import { IUser, IAuthResponse } from '@/model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<RegisterComponent>) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryRegister(value) {

    let user: IUser = {
      first_name: value.first,
      last_name: value.last,
      email: value.email,
      password: value.password
    }

    this.authService.register(user).subscribe((resp: IAuthResponse) => {
      if(resp.status){
        this.router.navigate(['/user']);
        this.thisDialogRef.close();
      }else{
        this.errorMessage = resp.error;
      }
    })
  }

  openLogin() {
    this.thisDialogRef.close('login');
  }
}
