import { NgModule, Optional, SkipSelf } from '@angular/core';

import {
  CartService, ItemDataService, StorageService, LocalStorageService, DeliveryOptionsDataService,
  OrderDataService, OrderItemDataService, ItemTypeDataService,
  CustomerDataService, PaymentDataService, ShipmentDataService, AuthService, UiLoadingService
} from '@/services';

import { UserService } from '@/services/user.service';

import { AuthGuard, PopulatedCartRouteGuard } from '@/route-guards';
import { ItemsResolver } from '@/resolvers';

import { RequestCache, RequestCacheWithMap } from '@/services';
import { httpInterceptorProviders } from '@/http-interceptors/index';

@NgModule({
  imports: [

  ],
  providers: [
    AuthService,
    UserService,
    ItemsResolver,
    AuthGuard,
    CartService,
    PopulatedCartRouteGuard,
    ItemDataService,
    ItemTypeDataService,
    CustomerDataService,
    UiLoadingService,
    { provide: StorageService, useClass: LocalStorageService },
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders
  ]
})
export class CoreModule { }