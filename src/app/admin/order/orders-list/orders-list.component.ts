import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../interface/Order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders-list',
  standalone: false,
  
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
  orders: Order[] = [];
  

  constructor(private router: Router,private _orderS:OrderService) { }

  ngOnInit(): void {
    this._orderS.viewAllOrders().subscribe(orders=>{
      this.orders = orders;
    })
  }

  onView(orderId: string): void {
    this.router.navigate(['/admin/order-details', orderId], { queryParams: { mode: 'view' } });
    console.log('View order:', orderId);
  }

  onEdit(orderId: string): void {
    this.router.navigate(['/admin/order-details/edit', orderId], { queryParams: { mode: 'edit' } });
    console.log('Edit order:', orderId);
  }
 

  onDelete(orderId: string): void {
    this._orderS.deleteOrder(orderId)
    console.log('Delete order:', orderId);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }
}
