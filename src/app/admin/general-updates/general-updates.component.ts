import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-general-updates',
  standalone: false,
  
  templateUrl: './general-updates.component.html',
  styleUrl: './general-updates.component.css'
})
export class GeneralUpdatesComponent implements OnInit{
  about: string = '';
  hours: string = '';
  address: string = '';
  phone: string = '';
  isLoading: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private _generalS: GeneralService){

  }

  ngOnInit() {
    this.loadCurrentInfo();
  }

  loadCurrentInfo() {
    this.isLoading = true;
    this._generalS.getGeneralData().subscribe(
      (data: any) => {
        this.about = data.about;
        this.hours = data.hours;
        this.address = data.address;
        this.phone = data.phone;
        this.isLoading = false;
      }
    );
  }
  

  onSubmit() {
    this.isLoading = true;
    const updatedInfo: any = {
      about: this.about,
      hours: this.hours,
      address: this.address,
      phone: this.phone
    };

      this._generalS.updateGeneralData(updatedInfo).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Update successful', response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error updating general information', error);
      }
    );
  }

  private showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }
  
}
