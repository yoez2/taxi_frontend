import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent {
  id: string = '';
  bookingForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bookingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      area: ['', [Validators.required]],
      city: ['', [Validators.required]],
      
    });

  this.fetchCustomer();
}

  fetchCustomer() {
    this.httpClient.get(`${environment.baseApiUrl}/customer/${this.id}`).subscribe({
      next: (data) => {
        this.bookingForm.patchValue(data);
      },
      error: (err) => {
        console.error('There was an error on fetching!', err);
      }
    });

  }
  onUpdate() {
    this.httpClient.put(`${environment.baseApiUrl}/customer/${this.id}`, this.bookingForm.value).subscribe({
      next: (data) => {
        alert('Customer has been Updated Sucessfully')
        this.router.navigate(['taxi']);
      },
      error: (err) => {
        console.error('There was an error!', err);
      }
    });
  }

}
