import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { UserRoutingModule } from '@/routers';

import { ProfileComponent, OrdersComponent, UserComponent } from '@/components/user';

@NgModule({
    imports: [CommonModule, UserRoutingModule, MaterialModule, FormsModule],
    declarations: [ ProfileComponent, OrdersComponent, UserComponent
    ],
    providers: [
    ]
})
export class UserModule { }