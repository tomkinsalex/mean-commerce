import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { LoginComponent } from '@/components/login';
import { RegisterComponent } from '@/components/register';
import { CartComponent } from '@/components/cart';
import { AuthService } from '@/services';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public loggedIn: boolean;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService ) { }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
  }
  
  openCart() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(CartComponent, dialogConfig);
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'register') {
        this.openRegister();
      }
    });
  }

  openRegister() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'login') {
        this.openLogin();
      }
    });
  }
}
