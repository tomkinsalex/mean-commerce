import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

import { IDeliveryOption } from "@/model";

@Injectable()
export class DeliveryOptionsDataService {

  public constructor(private http: HttpClient) {}

  public all(): Observable<IDeliveryOption[]> {
    return this.http
        .get<IDeliveryOption[]>("./assets/delivery-options.json")
        .pipe(map(((options: IDeliveryOption[]) => {
          return options;
        })));

  }
}