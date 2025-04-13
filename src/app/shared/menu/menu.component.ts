import { Component, HostListener, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  isMobile: boolean = false;

  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth <= 768; // Switch to mobile view at 768px or less
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }

}