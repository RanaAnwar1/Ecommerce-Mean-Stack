import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'application';
  isAdminRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Adjust this condition based on your admin route path
      this.isAdminRoute = this.router.url.startsWith('/admin');
    });
  }
}
