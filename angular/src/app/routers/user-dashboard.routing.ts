import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardComponent } from '@/components/user-dashboard';
import { UserResolver } from '@/resolvers';

const routes: Routes = [
    {   
        path: '', component: UserDashboardComponent, resolve: { data: UserResolver },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
  })
  export class UserDashboardRoutingModule { }