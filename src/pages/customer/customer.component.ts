import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../enviroments/enviroment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../app/services/notification.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  bookingForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  router = inject(Router);
  private notificationService = inject(NotificationService);

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
        this.notificationService.showNotification('Booked Sucessfully');
        this.router.navigate(['taxi']);  
      },
      error: () => {
        this.notificationService.showNotification('There was an error!');
      }
    });
  }
}


