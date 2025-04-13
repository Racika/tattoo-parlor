import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as artists from '../../../assets/data/artists.json';

@Component({
  selector: 'app-artists',
  imports: [CommonModule, FormsModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent {
  title = 'json-read';
  data: any = artists;

  selectedArtist: any = null;
  showPopup = false;
  rating = 0;
  comment = '';
  
  openPopup(artist: any) {
    this.selectedArtist = artist;
    this.showPopup = true;
    this.rating = 0;
    this.comment = '';
  }
  
  closePopup() {
    this.showPopup = false;
  }
  
  submitRating() {
    alert(`Thanks for your anonymous rating of ${this.rating}★!`);
    this.closePopup();
  }
  

  ngOnInit() {
    console.log('Data', this.data);
  }
}
