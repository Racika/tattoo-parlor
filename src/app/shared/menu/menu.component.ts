import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatMenuModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isMobile: boolean = false;
  isLoggedIn = false;

  @Output() selectedPage = new EventEmitter<string>();

  constructor(private router: Router, private auth: Auth) {}

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;

    this.auth.onAuthStateChanged(user => {
      this.isLoggedIn = !!user;
    });
  }

  navigate(page: string) {
    this.selectedPage.emit(page);
    this.router.navigate([page === 'home' ? '' : page]);
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
