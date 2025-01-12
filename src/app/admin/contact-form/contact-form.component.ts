import { Component } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  messages: any[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor(private _contactS:GeneralService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.isLoading = true;
    this._contactS.getContactFormData().subscribe({
      next: (data) => {
        this.messages = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load messages';
        this.isLoading = false;
        console.error('Error loading messages:', err);
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}
