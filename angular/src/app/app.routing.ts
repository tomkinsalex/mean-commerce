import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { StoreComponent, ItemComponent, MainComponent } from "@/components/store";
import { LoginComponent } from '@/components/login';
import { RegisterComponent } from '@/components/register';
import { UserComponent } from '@/components/user';
import { UserResolver } from '@/resolvers';

import { AuthGuard, PopulatedCartRouteGuard } from "@/route-guards";

import { IRouting } from '@/model';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'store/main' },
  {
    path: 'store', component: StoreComponent, resolve: { data: UserResolver }, children: [
      { path: '', pathMatch: 'full', redirectTo: 'main' },
      { path: 'item/:id', component: ItemComponent },
      { path: 'main', component: MainComponent },
    ]
  },
  {
    path: 'checkout', canActivate:[ PopulatedCartRouteGuard ], loadChildren: '@/modules/checkout.module#CheckoutModule'
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, resolve: { data: UserResolver } },
  { path: '**', pathMatch: 'full', redirectTo: 'store/main' } //catch any unfound routes and redirect to home page
];

export const appRouting: IRouting = {
  routes: RouterModule.forRoot(routes),
  components: [
    LoginComponent, ItemComponent,
    StoreComponent, MainComponent, RegisterComponent,
    UserComponent
  ]
};

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }