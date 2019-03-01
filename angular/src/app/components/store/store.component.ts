import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ActivatedRoute } from '@angular/router';

import { LoginComponent } from '@/components/login';
import { RegisterComponent } from '@/components/register';
import { CartComponent } from '@/components/cart';
import { MUser } from '@/model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  user: MUser = null;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    })
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
