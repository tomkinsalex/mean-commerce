import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { AuthService } from '@/services';
import { IUser, IAuthResponse } from '@/model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public thisDialogRef: MatDialogRef<RegisterComponent>) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.registerForm.controls; }

  tryRegister(value) {

    let user: IUser = {
      first_name: value.first,
      last_name: value.last,
      email: value.email,
      password: value.password
    }

    this.authService.register(user).subscribe((resp: IAuthResponse) => {
      if (resp.status) {
        this.router.navigate(['/user']);
        this.thisDialogRef.close();
      } else {
        this.errorMessage = resp.error;
      }
    })
  }

  openLogin() {
    this.thisDialogRef.close('login');
  }
}
