import { Injectable } from "@angular/core";

import { Observable, Observer } from "rxjs";

import { MCartItem, MCart, IDeliveryOption, IItem } from "@/model";
import { DeliveryOptionsDataService } from "@/services/delivery-options.service";
import { StorageService } from "@/services/storage.service";
import { ItemDataService } from "@/services/item.service";


const CART_KEY = "cart";

@Injectable()
export class CartService {
  private storage: Storage;
  private subscriptionObservable: Observable<MCart>;
  private subscribers: Array<Observer<MCart>> = new Array<Observer<MCart>>();
  private products: IItem[];
  private deliveryOptions: IDeliveryOption[];

  public constructor(private storageService: StorageService,
    private productService: ItemDataService,
    private deliveryOptionsService: DeliveryOptionsDataService) {
    this.storage = this.storageService.get();
    this.productService.all().subscribe((products) => this.products = products);
    this.deliveryOptionsService.all().subscribe((options) => this.deliveryOptions = options);

    this.subscriptionObservable = new Observable<MCart>((observer: Observer<MCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<MCart> {
    return this.subscriptionObservable;
  }

  public addItem(product: IItem, amount: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product._id);
    if (item === undefined) {
      item = new MCartItem();
      item.productId = product._id;
      item.name = product.name;
      item.title = product.title;
      item.price = product.price;
      cart.items.push(item);
    }

    item.quantity += amount;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public changeItemQuantity(product: MCartItem, amount: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.productId);

    item.quantity += amount;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public removeItem(product: MCartItem): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.productId);

    item.quantity = 0;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    const newCart = new MCart();
    this.save(newCart);
    this.dispatch(newCart);
  }


  private calculateCart(cart: MCart): void {
    cart.itemsTotal = cart.items
      .map((item) => item.quantity * this.products.find((p) => p._id === item.productId).price)
      .reduce((previous, current) => previous + current, 0);
    cart.grossTotal = cart.itemsTotal;
  }

  private retrieve(): MCart {
    const cart = new MCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }


  private save(cart: MCart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: MCart): void {
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
