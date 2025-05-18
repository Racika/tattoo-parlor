import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, signOut } from '@angular/fire/auth';
import { collection, getDocs, getFirestore, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Booking {
  id?: string;
  artist: string;
  date: string;
  time: string;
  comment?: string;
  user: string;
  email?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nickname = '';
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  editingBookingId: string | null = null;
  editedComment: string = '';
  sortAscending = true;
  showOnlyUpcoming = false;

  constructor(private auth: Auth, private router: Router) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    this.nickname = user?.displayName || 'Guest';

    if (!user || !user.email) {
      this.bookings = [];
      this.filteredBookings = [];
      return;
    }

    await this.loadBookings(user.email);
  }

  private async loadBookings(email: string) {
    const db = getFirestore();
    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, where('email', '==', email));

    const querySnapshot = await getDocs(q);
    this.bookings = [];
    querySnapshot.forEach(doc => {
      const data = doc.data() as Booking;
      data.id = doc.id;
      this.bookings.push(data);
    });

    this.applyFiltersAndSort();
  }

  toggleSortByDate() {
    this.sortAscending = !this.sortAscending;
    this.applyFiltersAndSort();
  }

  toggleShowOnlyUpcoming() {
    this.showOnlyUpcoming = !this.showOnlyUpcoming;
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort() {
    // Filter out past dates if needed
    const now = new Date();
    this.filteredBookings = this.showOnlyUpcoming
      ? this.bookings.filter(b => new Date(b.date) >= this.startOfDay(now))
      : [...this.bookings];

    // Sort
    this.filteredBookings.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return this.sortAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }

  async deleteBooking(bookingId: string | undefined) {
    if (!bookingId) return;

    const db = getFirestore();
    await deleteDoc(doc(db, 'bookings', bookingId));
    const user = this.auth.currentUser;
    if (user?.email) {
      await this.loadBookings(user.email);
    }
  }

  startEditing(booking: Booking) {
    this.editingBookingId = booking.id || null;
    this.editedComment = booking.comment || '';
  }

  cancelEditing() {
    this.editingBookingId = null;
    this.editedComment = '';
  }

  async saveComment(bookingId: string | null | undefined) {
    if (!bookingId) return;
    const db = getFirestore();
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, { comment: this.editedComment });
    this.editingBookingId = null;
    this.editedComment = '';
    const user = this.auth.currentUser;
    if (user?.email) {
      await this.loadBookings(user.email);
    }
  }
}
