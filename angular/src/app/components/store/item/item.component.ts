import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemDataService, CartService } from '@/services';
import { IItem } from "@/model";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public item: IItem = {
    title: '',
    name: '',
    price: 0,
    description: '',
    stock: 0
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: ItemDataService,
    private cartService: CartService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.getItem(id);
  }

  public addItemToCart(item: IItem, amount: number): void {
    this.cartService.addItem(item, amount);
    this.snackBar.open('Item added to Cart', '', {
      duration: 1000
    });
  }

  getItem(id: string) {
    this.dataService.getItem(id)
      .subscribe((item: IItem) => {
        this.item = item;
      });
  }

}
