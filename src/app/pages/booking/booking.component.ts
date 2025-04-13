import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as artistsData from '../../../assets/data/artists.json';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  artists: any[] = (artistsData as any).default; // needed due to TypeScript import quirk

  formData = {
    selectedArtist: '',
    date: '',
    comment: ''
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.formData = {
      selectedArtist: '',
      date: '',
      comment: ''
    };
  }
}
