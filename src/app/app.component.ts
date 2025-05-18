import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenuComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'parlor';

  constructor(private router: Router) {}

  onNavigate(page: string) {
    this.router.navigate([page === 'home' ? '' : page]);
  }
}
