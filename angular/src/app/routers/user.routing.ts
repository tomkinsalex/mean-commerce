import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent, ProfileComponent, OrdersComponent } from '@/components/user';
import { UserResolver } from '@/resolvers';

const routes: Routes = [
    {   
        path: '', component: UserComponent, resolve: { data: UserResolver }, children: [
            { path: '', pathMatch: 'full', redirectTo: 'profile' },
            { path: 'profile', component: ProfileComponent },
            { path: 'orders', component: OrdersComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
  })
  export class UserRoutingModule { }