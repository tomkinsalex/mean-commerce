import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

import { IDeliveryOption } from "@/model";
import { CachingServiceBase } from "./caching.service";

@Injectable()
export class DeliveryOptionsDataService extends CachingServiceBase {
  private deliveryOptions: Observable<IDeliveryOption[]>;

  public constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<IDeliveryOption[]> {
    return this.cache<IDeliveryOption[]>(() => this.deliveryOptions,
      (val: Observable<IDeliveryOption[]>) => this.deliveryOptions = val,
      () => this.http
        .get<IDeliveryOption[]>("./assets/delivery-options.json")
        .pipe(map(((options: IDeliveryOption[]) => {
          return options;
        }))));

  }
}