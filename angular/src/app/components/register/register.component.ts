import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerDataService, AuthService } from '@/services';
import { ICustomer } from '@/model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerDataService,
    public thisDialogRef: MatDialogRef<RegisterComponent>) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
        var cust: ICustomer = null;
        this.customerService.getCustomerByEmail(res.user.email)
          .subscribe((customer: ICustomer) => { cust = customer },
            (err: any) => { console.log(err) },
            () => {
              if (cust === null) {
                this.customerService.insertCustomer({
                  email: res.user.email,
                  auth_id: res.user.uid,
                }).subscribe(() => { }, (err: any) => { console.log(err) }, () => {
                  this.router.navigate(['/user']);
                  this.thisDialogRef.close();
                });
              } else {
                cust.auth_id = res.user.uid;
                this.customerService.updateCustomer(cust)
                  .subscribe(() => { }, (err: any) => { console.log(err) }, () => {
                    this.router.navigate(['/user']);
                    this.thisDialogRef.close();
                  });
              }
            });
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  openLogin() {
    this.thisDialogRef.close('login');
  }
}
