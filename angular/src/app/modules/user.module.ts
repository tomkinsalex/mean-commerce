import { NgModule } from '@angular/core';

import { UserRoutingModule } from '@/routers';
import { ProfileComponent, OrdersComponent, UserComponent } from '@/components/user';
import { SharedModule } from './shared.module';

@NgModule({
    imports: [ UserRoutingModule, SharedModule ],
    declarations: [ ProfileComponent, OrdersComponent, UserComponent ],
    providers: [
    ]
})
export class UserModule { }