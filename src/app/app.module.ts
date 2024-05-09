import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AboutusComponent } from '../pages/aboutus/aboutus.component';
import { CustomerComponent } from '../pages/customer/customer.component';
import { TouristComponent } from '../pages/tourist/tourist.component';
import { TaxiComponent } from '../pages/taxi/taxi.component';
import { UpdateCustomerComponent } from '../pages/customer/update-customer/update-customer.component';
import { UpdateTouristComponent } from '../pages/tourist/update-tourist/update-tourist.component';





@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
   NavbarComponent,
    FooterComponent,
    AboutusComponent,
    CustomerComponent,
    TouristComponent,
    TaxiComponent,
    UpdateCustomerComponent,
    UpdateTouristComponent,
   
   
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
