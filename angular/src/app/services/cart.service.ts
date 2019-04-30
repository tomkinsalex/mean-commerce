import { Injectable } from "@angular/core";

import { Observable, Observer } from "rxjs";

import { ICartItem, ICart, IItem } from "@/model";
import { StorageService } from "@/services/storage.service";
import { ItemDataService } from "@/services/item.service";

const CART_KEY = "cart";

@Injectable()
export class CartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ICart>;
  private subscribers: Array<Observer<ICart>> = new Array<Observer<ICart>>();
  private items: IItem[];

  public constructor(private storageService: StorageService,
    private itemService: ItemDataService) {

    this.storage = this.storageService.get();
    this.itemService.all().subscribe((items) => this.items = items);

    this.subscriptionObservable = new Observable<ICart>((observer: Observer<ICart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<ICart> {
    return this.subscriptionObservable;
  }

  public addItem(newItem: IItem, amount: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.id === newItem._id);
    if (item === undefined) {
      item = {
      id : newItem._id,
      name : newItem.name,
      title : newItem.title,
      price : newItem.price,
      quantity: 0,
      maxQuantity : newItem.stock
      };
      cart.items.push(item);
    }

    item.quantity += amount;

    this.updateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public changeItemQuantity(itemToChange: ICartItem, amount: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.id === itemToChange.id);

    item.quantity += amount;

    this.updateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public removeItem(itemToRemove: ICartItem): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.id === itemToRemove.id);

    item.quantity = 0;

    this.updateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    const newCart = {
      items: new Array(),
      total: 0,
      itemCount: 0
    };

    this.save(newCart);
    this.dispatch(newCart);
  }


  private updateCart(cart: ICart): void {  
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    cart.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    cart.total = cart.items
    .map((item) => item.quantity * item.price)
    .reduce((previous, current) => previous + current, 0);

    cart.items.map((item)=>{
      if(item.quantity > item.maxQuantity){
        item.quantity = item.maxQuantity;
      }
    })
  }

  private retrieve(): ICart {
    let cart: ICart = {
      items: new Array(),
      total: 0,
      itemCount: 0
    };
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart = JSON.parse(storedCart);
    }
    return cart;
  }


  private save(cart: ICart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ICart): void {
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
          // we want all subscribers to get the update even if one errors.
        }
      });
  }
}
