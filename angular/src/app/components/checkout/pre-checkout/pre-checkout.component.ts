import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AuthService } from '@/services';
import { IUser, IAuthResponse } from '@/model';

@Component({
  selector: 'app-pre-checkout',
  templateUrl: './pre-checkout.component.html',
  styleUrls: ['./pre-checkout.component.scss']
})
export class PreCheckoutComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  guestForm: FormGroup;
  errorMessage: string = '';
  showRegister: boolean = false;
  showLogin: boolean = false;
  showGuest: boolean = false;
  checkoutOptions: string[] = ['Register', 'Login', 'Guest'];

  constructor(public authService: AuthService,
    private router: Router,
    private fb: FormBuilder, ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.guestForm = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get r() { return this.registerForm.controls; }
  get l() { return this.loginForm.controls; }
  get g() { return this.guestForm.controls; }

  setCheckoutOption(option) {
    this.showRegister = option === 'Register';
    this.showGuest = option === 'Guest';
    this.showLogin = option === 'Login';
    this.errorMessage = '';
  }

  tryRegister(value) {
    let user: IUser = {
      first_name: value.first,
      last_name: value.last,
      email: value.email,
      password: value.password
    }

    this.authService.register(user).subscribe((resp: IAuthResponse) => {
      if (resp.status) {
        this.router.navigate(['checkout/confirmation']);
      } else {
        this.errorMessage = resp.error;
      }
    })
  }

  tryLogin(value) {
    let user: IUser = {
      email: value.email,
      password: value.password
    }

    this.authService.login(user).subscribe((resp: IAuthResponse) => {
      if (resp.status) {
        this.router.navigate(['checkout/confirmation']);
      } else {
        this.errorMessage = resp.error;
      }
    })
  }

  tryGuest(value) {
    let user: IUser = {
      first_name: value.first,
      last_name: value.last,
      email: value.email,
    }

    this.authService.createGuest(user).subscribe((resp: IAuthResponse) => {
      if (resp.status) {
        this.router.navigate(['checkout/confirmation']);
      } else {
        this.errorMessage = resp.error;
      }
    })
  }

}
