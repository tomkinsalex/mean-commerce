import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, appRouting } from '@/app.routing';
import { AppComponent } from '@/app.component';
import { SharedModule } from '@/modules';
import { CartComponent } from '@/components/cart';
import { LoginComponent } from '@/components/login';
import { RegisterComponent } from '@/components/register';

import { MatSpinner } from '@angular/material';


@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    appRouting.components,
    CartComponent,
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [CartComponent, LoginComponent, RegisterComponent, MatSpinner]
})
export class AppModule { }
