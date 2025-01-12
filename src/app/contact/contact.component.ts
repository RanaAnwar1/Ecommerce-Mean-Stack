import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../services/general.service';

export interface ContactInfo {
  address: string;
  phone: string;
  hours: string;
}

@Component({
  selector: 'app-contact',
  standalone: false,
  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  contactInfo!: ContactInfo;
  loading = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private _contactS: GeneralService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadContactInfo();
  }

  loadContactInfo() {
    this._contactS.getGeneralData().subscribe({
      next: (data) => {
        console.log("contact info loaded",data)
        this.contactInfo = data[0];
        console.log("contact info",this.contactInfo)
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load contact information';
        this.loading = false;
        console.error('Error loading contact info:', error);
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const name = this.contactForm.get('name')?.value;
      const email = this.contactForm.get('email')?.value;
      const message = this.contactForm.get('message')?.value;
      this._contactS.sendContactFormData(name,email,message).subscribe(
        () => {
          console.log("Form submitted successfully")
          this.contactForm.reset();
          this.error = null;
        },
        (error) => {
          this.error = 'Failed to send contact form data';
          console.error('Error sending contact form data:', error);
        }
      )
      console.log(this.contactForm.value);
    }
  }
}
