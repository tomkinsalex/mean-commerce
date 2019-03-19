import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule, appRouting } from '@/app.routing';
import { AppComponent } from '@/app.component';
import { MaterialModule, CoreModule } from '@/modules';
import { CartComponent } from '@/components/cart';
import { LoginComponent } from '@/components/login';
import { RegisterComponent } from '@/components/register';

import { MatSpinner } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    HttpClientModule,
/*     HttpClientXsrfModule.withOptions({
       cookieName: 'My-XSRF-TOKEN',
       headerName: 'My-X-XSRF-TOKEN',
    }), */
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    OverlayModule
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
