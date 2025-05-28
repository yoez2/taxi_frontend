import { Routes } from '@angular/router';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { AboutusComponent } from '../pages/aboutus/aboutus.component';
import { CustomerComponent } from '../pages/customer/customer.component';
import { TouristComponent } from '../pages/tourist/tourist.component';
import { TaxiComponent } from '../pages/taxi/taxi.component';
import { UpdateCustomerComponent } from '../pages/customer/update-customer/update-customer.component';
import { UpdateTouristComponent } from '../pages/tourist/update-tourist/update-tourist.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'about us',
    component: AboutusComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'tourist',
    component: TouristComponent
  },
  {
    path: 'taxi',
    component: TaxiComponent
  },
  {
    path: 'customer/update/:id',
    component: UpdateCustomerComponent
  },
  {
    path: 'tourist/update/:id',
    component: UpdateTouristComponent
  }
];
