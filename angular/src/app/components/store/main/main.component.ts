import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Observer } from "rxjs";

import { ItemDataService, CartService } from '@/services';
import { IItem } from "@/model";
import { ActivatedRoute } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public items: IItem[];
  public item: IItem;
  public constructor(private itemService: ItemDataService,
    private cartService: CartService,
    private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.items = data;
      }
    })
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
          obs.next(cart.items.some((i) => i.id === item._id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }

}
