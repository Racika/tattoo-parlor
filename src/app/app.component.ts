import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MenuComponent } from './shared/menu/menu.component';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, ArtistsComponent, BookingComponent, ContactComponent, MenuComponent, MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'tatto-parlor';

  activePage: string = 'home';

  changePage(pageValue: string) {
    this.activePage = pageValue;
  }
}
