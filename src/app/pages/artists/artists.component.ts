import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as artists from '../../../assets/data/artists.json';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-artists',
  imports: [CommonModule, FormsModule, MatButtonModule,MatCardModule,MatToolbarModule,MatIconModule,MatIcon,
    MatDialogModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatSnackBarModule,MatDividerModule],
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
