import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/enviroment';
import { NotificationService } from '../../app/services/notification.service';

@Component({
  selector: 'app-tourist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tourist.component.html',
  styleUrl: './tourist.component.css'
})
export class TouristComponent implements OnInit{
  bookingForm2!: FormGroup;
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  router = inject(Router)
  private notificationService = inject(NotificationService);

  ngOnInit() : void{
    this.bookingForm2 = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSave1() {
    this.httpClient.post(`${environment.baseApiUrl}/Tourist`, this.bookingForm2.value).subscribe({
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
