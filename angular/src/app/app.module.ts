import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule, appRouting } from '@/app.routing';
import { AppComponent } from '@/app.component';
import { MaterialModule, CoreModule } from '@/modules';
import { CartComponent } from '@/components/cart';

import { environment } from 'environments/environment.prod';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AppRoutingModule,
    CoreModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    appRouting.components,
    CartComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [CartComponent]
})
export class AppModule { }
