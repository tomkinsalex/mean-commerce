import { NgModule } from '@angular/core';

import { UserDashboardRoutingModule } from '@/routers';
import { ProfileComponent, OrdersComponent, UserDashboardComponent, ChangePasswordComponent } from '@/components/user-dashboard';
import { SharedModule } from './shared.module';
import { UserResolver } from '@/resolvers';

@NgModule({
    imports: [ UserDashboardRoutingModule, SharedModule ],
    declarations: [ ProfileComponent, OrdersComponent, UserDashboardComponent, ChangePasswordComponent ],
    providers: [ UserResolver
    ]
})
export class UserDashboardModule { }