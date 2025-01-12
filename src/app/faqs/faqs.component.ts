import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  standalone: false,
  
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
  faqItems = [
    {
      question: 'What is your return policy?',
      answer:
        'Our return policy allows for returns within 30 days of purchase with a valid receipt. Items must be unused and in original packaging.',
      open: false
    },
    {
      question: 'How do I track my order?',
      answer:
        'You can track your order using the tracking number provided in your order confirmation email.',
      open: false
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we offer international shipping. Shipping fees and times vary based on the destination country.',
      open: false
    },
    {
      question: 'How can I contact customer service?',
      answer:
        'You can contact customer service via email at support@example.com or call us at 1-800-123-4567.',
      open: false
    }
  ];

  toggleFaq(item: any): void {
    item.open = !item.open;
  }
}
