import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import * as artistsData from '../../../assets/data/artists.json';
import * as bookingTimesData from '../../../assets/data/booking-times.json';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']  
})
export class BookingComponent implements OnInit {
  artists: any[] = (artistsData as any).default;
  bookingTimes: string[] = (bookingTimesData as any).default;

  formData = {
    selectedArtist: '',
    date: '',
    time: '',
    comment: ''
  };

  submitted = false;

  constructor(private firestore: Firestore, private auth: Auth, private router: Router) {}

  async ngOnInit() {
    const currentUser = await firstValueFrom(user(this.auth));
    if (!currentUser) {
      this.router.navigate(['/']);  // redirect to homepage if not logged in
    }
  }

  async onSubmit() {
    this.submitted = true;

    let nickname = 'guest';
    let email = '';
    const currentUser = await firstValueFrom(user(this.auth));
    if (currentUser && currentUser.displayName) {
      nickname = currentUser.displayName;
      if(currentUser.email){
        email = currentUser.email;
      }
    } else if (currentUser && currentUser.email) {
      nickname = currentUser.email;
    }

    const bookingData = {
      nickname,
      artist: this.formData.selectedArtist,
      date: this.formData.date,
      time: this.formData.time,
      comment: this.formData.comment || '',
      email,
      createdAt: new Date()
    };

    try {
      const bookingsRef = collection(this.firestore, 'bookings');
      await addDoc(bookingsRef, bookingData);
      console.log('Booking saved successfully');
      this.formData = { selectedArtist: '', date: '', time: '', comment: '' };
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  }
}
