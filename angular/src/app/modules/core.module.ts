import { NgModule, Optional, SkipSelf } from '@angular/core';

import {
  CartService, ItemDataService, StorageService, LocalStorageService, DeliveryOptionsDataService,
  OrderDataService, OrderItemDataService, ItemTypeDataService,
  CustomerDataService, PaymentDataService, ShipmentDataService, AuthService, UserService
} from '@/services';

import { AuthGuard, PopulatedCartRouteGuard } from '@/route-guards';
import { UserResolver } from '@/resolvers';

import { EnsureModuleLoadedOnceGuard } from '@/shared';

@NgModule({
  imports: [

  ],
  providers: [
    AuthService,
    UserService,
    UserResolver,
    AuthGuard,
    CartService,
    PopulatedCartRouteGuard,
    ItemDataService,
    DeliveryOptionsDataService,
    OrderDataService,
    OrderItemDataService,
    PaymentDataService,
    ShipmentDataService,
    ItemTypeDataService,
    CustomerDataService,
    { provide: StorageService, useClass: LocalStorageService },
    {
      deps: [StorageService, ItemDataService, DeliveryOptionsDataService],
      provide: CartService,
      useClass: CartService
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    //Ensure that CoreModule is only loaded into AppModule

  //Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}