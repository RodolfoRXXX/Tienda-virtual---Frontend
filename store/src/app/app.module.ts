import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './shared/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
