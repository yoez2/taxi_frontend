import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomepageComponent } from '../pages/homepage/homepage.component';
import { AboutusComponent } from '../pages/aboutus/aboutus.component';
import { TouristComponent } from '../pages/tourist/tourist.component';
import { TaxiComponent } from '../pages/taxi/taxi.component';
import { UpdateCustomerComponent } from '../pages/customer/update-customer/update-customer.component';
import { UpdateTouristComponent } from '../pages/tourist/update-tourist/update-tourist.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HomepageComponent,
    AboutusComponent,
    TouristComponent,
    TaxiComponent,
    UpdateCustomerComponent,
    UpdateTouristComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
