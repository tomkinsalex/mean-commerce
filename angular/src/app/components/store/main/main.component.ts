import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Observer } from "rxjs";

import { ItemDataService, CartService } from '@/services';
import { IItem } from "@/model";



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public items: Observable<IItem[]>;
  public item: IItem;
  public constructor(private itemService: ItemDataService,
    private cartService: CartService,
    private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.items = this.getItems();
  }

  public getItems(): Observable<IItem[]> {
    return this.itemService.all();
  }

  public addItemToCart(item: IItem, amount: number): void {
    this.cartService.addItem(item, amount);
    this.snackBar.open('Item added to Cart', '', {
      duration: 1000
    })
  }

  public productInCart(item: IItem): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.cartService
        .get()
        .subscribe((cart) => {
          obs.next(cart.items.some((i) => i.productId === item._id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }

}
