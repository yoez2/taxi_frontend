import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../enviroments/enviroment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  bookingForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  router = inject(Router);


  

  
  ngOnInit():void {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],

    
    });
  }
  onSave() {
    this.httpClient.post(`${environment.baseApiUrl}/Customer`, this.bookingForm.value).subscribe({
      next: (data) => {
        alert('Booked Sucessfully')
        this.router.navigate(['taxi']);  
      },
      error: () => {
        alert('There was an error!');
      }
    });
  }
 
}


