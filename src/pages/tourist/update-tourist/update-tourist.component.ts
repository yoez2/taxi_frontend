import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-update-tourist',
  templateUrl: './update-tourist.component.html',
  styleUrl: './update-tourist.component.css'
})
export class UpdateTouristComponent {
  @Input() id: string = '';
  bookingForm2!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bookingForm2 = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      area: ['', [Validators.required]],
      city: ['', [Validators.required]],
      
    });

    this.httpClient.get(`${environment.baseApiUrl}/tourist/${this.id}`).subscribe({
      next: (data: any) => {
        delete data.id;
        this.bookingForm2.setValue(data);
      },
      error: (err) => {
        console.error('There was an error on fetching!', err);
      }
    });

 
}


  
  onUpdate1() {
    this.httpClient.put(`${environment.baseApiUrl}/tourist/${this.id}`, this.bookingForm2.value).subscribe({
      next: (data) => {
        alert('Tourist has been Updated Sucessfully')
        this.router.navigate(['taxi']);
      },
      error: (err) => {
        console.error('There was an error!', err);
      }
    });
  }

}
