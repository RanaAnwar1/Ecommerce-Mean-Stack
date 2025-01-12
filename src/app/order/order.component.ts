import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, Order } from '../interface/Order';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../interface/Cart';
import { UserService } from '../services/user.service';
import { User } from '../interface/User';

@Component({
  selector: 'app-order',
  standalone: false,
  
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  checkoutForm!: FormGroup;
  showNewAddress: boolean = false;
  order!: Order;
  cart!:Cart;
  user!: User;
  savedAddresses: Address[] = [];
  selectedAddress!:Address
  constructor(private fb: FormBuilder, private _orderS: OrderService
    , private _cartS:CartService, private _userS:UserService
  ) {}

  ngOnInit(): void {
    this.loadCart()
    this.checkoutForm = this.fb.group({
      address: [''],
      street: ['', Validators.required],
      apartmentNumber: [''],
      floorNumber: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: [
        '',
        [ Validators.pattern('[0-9]{5}')], 
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?[0-9]\d{1,12}$/), 
        ],
      ],
    });
    
    this.checkoutForm.get('address')?.valueChanges.subscribe((value) => {
      this.showNewAddress = value === 'new';
      if (!this.showNewAddress) {
        this.clearValidators();
      } else {
        this.setValidators();
      }
    });
  }
  fetchUserAddress(id: string){
    this._userS.getUserDetails(id).subscribe(
      (user) => {
        this.user = user;
        this.savedAddresses = user.address;
        this.selectedAddress = this.savedAddresses[0]; 
      }
    )
  }

 
  loadCart(): void {
    this._cartS.viewCart().subscribe((cart) => {
      this.cart = cart;
      this.fetchUserAddress(cart.userId);
    });
    
  }
  calculateTotal(): number {
    return this.cart.products.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  }
 
  selectAddress(address: Address): void {
    this.selectedAddress = address;
    this.checkoutForm.patchValue({
      street: address.street,
      apartmentNumber: address.apartmentNumber,
      floorNumber: address.floorNumber,
      city: address.city,
      zipCode: address.zipCode,
      phoneNumber: this.user.phoneNumber,
    });

    this.clearValidators();
  }
  placeOrder(): void {
    console.log("Place Order")
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
      let addressData: Address;
      let phoneNumber: string;

      if (this.showNewAddress === false) {
        if (!this.selectedAddress) {
          alert('Please select a saved address.');
          return;
        }
        addressData = this.selectedAddress;
        phoneNumber = this.user.phoneNumber;
      } else {
        addressData = {
          street: this.checkoutForm.value.street,
          apartmentNumber: this.checkoutForm.value.apartmentNumber,
          floorNumber: this.checkoutForm.value.floorNumber,
          city: this.checkoutForm.value.city,
          zipCode: this.checkoutForm.value.zipCode,
        };
        phoneNumber = this.checkoutForm.value.phoneNumber;
      }
       

      this._orderS.placeOrder(addressData,phoneNumber).subscribe(
        (response) => {
          console.log('Order placed successfully:', response);
          alert('Order placed successfully!');
        },
        (error) => {
          console.error('Error placing order:', error);
          alert('Error placing the order. Please try again.');
        }
      );
    } else {
      alert('Please fill out all required fields.');
    
    }
  }
  private clearValidators(): void {
    
    this.checkoutForm.get('street')?.clearValidators();
    this.checkoutForm.get('apartmentNumber')?.clearValidators();
    this.checkoutForm.get('floorNumber')?.clearValidators();
    this.checkoutForm.get('city')?.clearValidators();
    this.checkoutForm.get('zipCode')?.clearValidators();
    this.checkoutForm.get('phoneNumber')?.clearValidators();
    this.checkoutForm.updateValueAndValidity();
  }

  private setValidators(): void {
    this.checkoutForm.get('street')?.setValidators(Validators.required);
    this.checkoutForm.get('apartmentNumber')?.setValidators([]);
    this.checkoutForm.get('floorNumber')?.setValidators(Validators.required);
    this.checkoutForm.get('city')?.setValidators(Validators.required);
    this.checkoutForm.get('zipCode')?.setValidators([
      Validators.pattern('[0-9]{5}'),
    ]);
    this.checkoutForm.get('phoneNumber')?.setValidators([
      Validators.required,
      Validators.pattern(/^\+?[0-9]\d{1,12}$/),
    ]);
    this.checkoutForm.updateValueAndValidity();
  }
}
