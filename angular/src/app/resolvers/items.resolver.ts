import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";

import { ItemDataService } from '@/services';
import { IItem } from '@/model';

@Injectable()
export class ItemsResolver implements Resolve<IItem[]> {

  constructor(private itemService: ItemDataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<IItem[]> {

    let items: IItem[];

    return new Promise((resolve, reject) => {
      this.itemService.all().subscribe((resp: IItem[]) => {
        items = resp;
      }, (err: any) => {
        console.log(err)
        return reject(null);
      },
        () => {
          return resolve(items);
        }
      );
    })
  }
}
