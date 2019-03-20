import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { StoreComponent, ItemComponent, MainComponent } from "@/components/store";
import { ItemsResolver } from '@/resolvers';

import { AuthGuard, PopulatedCartRouteGuard } from "@/route-guards";
import { IRouting } from '@/model';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'store/main' },
  {
    path: 'store', component: StoreComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'main' },
      { path: 'item/:id', component: ItemComponent },
      { path: 'main', component: MainComponent, resolve: { data: ItemsResolver } },
    ]
  },
  {
    path: 'checkout', canActivate:[ PopulatedCartRouteGuard ], loadChildren: '@/modules/checkout.module#CheckoutModule'
  },
  {
    path: 'user', canActivate:[ AuthGuard ], loadChildren: '@/modules/user.module#UserModule'
  },
  { path: '**', pathMatch: 'full', redirectTo: 'store/main' } //catch any unfound routes and redirect to home page
];

export const appRouting: IRouting = {
  routes: RouterModule.forRoot(routes),
  components: [
    ItemComponent, MainComponent,
    StoreComponent,
  ]
};

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }