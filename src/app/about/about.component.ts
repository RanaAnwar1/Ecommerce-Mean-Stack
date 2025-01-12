import { Component } from '@angular/core';
import { GeneralService } from '../services/general.service';
interface QualityItem {
  icon: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  aboutInfo: string ='';
  loading = true;
  error: string | null = null;
  qualityItems: QualityItem[] = [
    {
      icon: 'fas fa-shipping-fast',
      title: 'Fast Shipping',
      description: 'Get your orders delivered quickly and on time.'
    },
    {
      icon: 'fas fa-star',
      title: 'Best Quality',
      description: 'Only the highest-quality products for you.'
    },
    {
      icon: 'fas fa-tags',
      title: 'Best Offers',
      description: 'Enjoy exclusive discounts and deals.'
    },
    {
      icon: 'fas fa-cart-plus',
      title: 'Convenient Shopping',
      description: 'Experience hassle-free and enjoyable shopping.'
    }
  ];

  constructor(private _aboutS: GeneralService) {}

  ngOnInit() {
    this.loadAboutInfo();
  }

  loadAboutInfo() {
    this._aboutS.getGeneralData().subscribe({
      next: (data) => {
        this.aboutInfo = data[0].about;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load about information';
        this.loading = false;
        console.error('Error loading about info:', error);
      }
    });
  }
}
