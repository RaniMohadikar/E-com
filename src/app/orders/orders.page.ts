import { Component } from '@angular/core';
import { OrderService, Order } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage {
  selectedStatus = 'All';
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ionViewWillEnter() {
    this.orders = this.orderService.getOrders();
  }

  get filteredOrders(): Order[] {
    if (this.selectedStatus === 'All') return this.orders;
    return this.orders.filter(o => o.status === this.selectedStatus);
  }

  getFirstItemName(order: Order): string {
    return order.items[0]?.name || 'Order';
  }

  getTotalItems(order: Order): number {
    return order.items.reduce((sum, i) => sum + i.quantity, 0);
  }
}
