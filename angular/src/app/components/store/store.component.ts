import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ActivatedRoute } from '@angular/router';

import { CartComponent } from '@/components/cart';
import { UserService } from '@/services';
import { MUser } from '@/model';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
              
  user: MUser = null;
  
  constructor(private dialog: MatDialog, private userService: UserService,
            private route: ActivatedRoute) { }


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

}
