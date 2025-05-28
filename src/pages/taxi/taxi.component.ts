import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/enviroment';
import { NotificationService } from '../../app/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taxi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taxi.component.html',
  styleUrl: './taxi.component.css'
})
export class TaxiComponent implements OnInit{
  httpClient = inject(HttpClient);
  router = inject(Router);
  notificationService = inject(NotificationService);

  customerlist: {
    id: string;
    name: string;
    phone: string;
    email: string; 
    date: string; 
    time: string; 
    area: string; 
    city: string; 
   
  }[] = [];


  ngOnInit(): void {
    this.fetchCustomer();
    this.fetchTourist();
  }

  fetchCustomer() {
    this.httpClient.get(`${environment.baseApiUrl}/Customer`).subscribe({
      next: (data) => {
        this.customerlist = data as {
          id: string;
          name: string;
          phone: string;
          email: string; 
          date: string; 
          time: string; 
          area: string; 
          city: string;  
        }[];
      },
      error: () => {
        this.notificationService.showNotification('There was an error!');
      }
    });
  }

  // create-tourist

  touristlist: {
    id: string;
    name: string;
    phone: string;
    email: string; 
    date: string; 
    time: string; 
    area: string; 
    city: string; 
  }[] = [];


  fetchTourist() {
    this.httpClient.get(`${environment.baseApiUrl}/Tourist`).subscribe({
      next: (data) => {
        this.touristlist = data as {
          id: string;
          name: string;
          phone: string;
          email: string; 
          date: string; 
          time: string; 
          area: string; 
          city: string;  
        }[];
      },
      error: () => {
        this.notificationService.showNotification('There was an error!');
      }
    });
  }

  //delete customer
  onDelete(id: string) {
    if (confirm("Do you want to Delete?")) {
      this.httpClient.delete(`${environment.baseApiUrl}/customer/${id}`).subscribe({
        next: (data) => {
          this.notificationService.showNotification('customer has been Deleted Sucessfully');
          this.fetchCustomer();
        },
        error: () => {
          this.notificationService.showNotification('There was an error!');
        }
      });
    } else {
    }
  }

    //delete tourist
    onDelete1(id: string) {
      if (confirm("Do you want to Delete?")) {
        this.httpClient.delete(`${environment.baseApiUrl}/tourist/${id}`).subscribe({
          next: (data) => {
            this.notificationService.showNotification('tourist has been Deleted Sucessfully');
            this.fetchTourist();
          },
          error: () => {
            this.notificationService.showNotification('There was an error!');
          }
        });
      } else {
      }
    }

    onEdit(id:string){
      this.router.navigate(['customer/update/'+id]);
     
      

    }


    onEdit1(id:string){
      this.router.navigate(['tourist/update/'+id]);
    }
}
