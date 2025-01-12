import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../interface/Order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-details',
  standalone: false,
  
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  order: Order | null = null;
  mode: 'view' | 'edit' = 'view';
  statusForm: FormGroup;
  loading = true;
  saving = false;
  orderStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService
    ) {
    this.statusForm = this.fb.group({
      orderStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const orderId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.queryParams['mode'] || 'view';
    this.loadOrder(orderId);
  }

  private async loadOrder(id: string): Promise<void> {
    try {
      
      this.orderService.viewOrderDetails(id).subscribe((order)=>{
        this.order = order;
      })
      this.statusForm.patchValue({
        orderStatus: this.order?.orderStatus
      });
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      this.loading = false;
    }
  }


  toggleMode(): void {
    this.mode = this.mode === 'view' ? 'edit' : 'view';
    if (this.mode === 'edit') {
      this.statusForm.patchValue({
        orderStatus: this.order?.orderStatus
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Shipped': return 'status-shipped';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  async onSubmit(): Promise<void> {
    if (this.statusForm.valid && !this.saving) {
      this.saving = true;
      try {
        const newStatus = this.statusForm.value.orderStatus;
        
        this.orderService.updateOrderStatus(this.order!._id!,newStatus)
        this.order!.orderStatus = newStatus;
        this.mode = 'view';
      } catch (error) {
        console.error('Error updating order status:', error);
      } finally {
        this.saving = false;
      }
    }
  }

  calculateSubtotal(price: number, quantity: number): number {
    return price * quantity;
  }
}
