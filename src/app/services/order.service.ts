import { Injectable } from '@angular/core';
import { CartItem } from '../cart.service';

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  address: string;
  icon: string;
  bgColor: string;
}

const SEED_ORDERS: Order[] = [
  {
    id: '123456',
    date: '24 May 2024, 10:30 AM',
    status: 'Processing',
    items: [{ id: 1, name: 'boAt Rockerz 450 Wireless Headphones', price: 1499, category: 'Electronics', icon: 'headset-outline', bgColor: '#1a1a2e', color: 'Black', quantity: 1 }],
    subtotal: 1499, shipping: 0, discount: 0, total: 1499,
    address: '123, MG Road, New Delhi - 110001',
    icon: 'headset-outline', bgColor: '#1a1a2e'
  },
  {
    id: '123455',
    date: '16 May 2024',
    status: 'Shipped',
    items: [{ id: 2, name: 'Fastrack Analog Watch for Men', price: 1195, category: 'Electronics', icon: 'watch-outline', bgColor: '#2c3e50', color: 'Black', quantity: 1 }],
    subtotal: 1195, shipping: 0, discount: 0, total: 1195,
    address: '456, Park Street, Civil Lines - 226001',
    icon: 'watch-outline', bgColor: '#2c3e50'
  },
  {
    id: '123454',
    date: '10 May 2024',
    status: 'Delivered',
    items: [{ id: 10, name: 'Puma Unisex Backpack Navy Blue', price: 889, category: 'Men', icon: 'bag-outline', bgColor: '#1e3a5f', color: 'Navy Blue', quantity: 1 }],
    subtotal: 889, shipping: 0, discount: 0, total: 889,
    address: '789, 5th Avenue, Koramangala, Bangalore - 560001',
    icon: 'bag-outline', bgColor: '#1e3a5f'
  },
  {
    id: '123453',
    date: '01 May 2024',
    status: 'Cancelled',
    items: [{ id: 3, name: 'Sony WF-1000XM4 Earbuds', price: 9999, category: 'Electronics', icon: 'musical-notes-outline', bgColor: '#2d2d2d', color: 'Black', quantity: 1 }],
    subtotal: 9999, shipping: 0, discount: 0, total: 9999,
    address: '321, Juhu Tara Road, Mumbai - 400049',
    icon: 'musical-notes-outline', bgColor: '#2d2d2d'
  },
];

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly ORDERS_KEY = 'USER_ORDERS';

  placeOrder(items: CartItem[], subtotal: number, discount: number): Order {
    const first = items[0];
    const order: Order = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      date: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Processing',
      items: [...items],
      subtotal,
      shipping: 0,
      discount,
      total: subtotal - discount,
      address: '123, MG Road, New Delhi - 110001',
      icon: first?.icon || 'bag-outline',
      bgColor: first?.bgColor || '#1a1a2e'
    };
    const orders = this.getUserOrders();
    orders.unshift(order);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    return order;
  }

  getOrders(): Order[] {
    const userOrders = this.getUserOrders();
    const seedIds = SEED_ORDERS.map(o => o.id);
    const filteredSeeds = SEED_ORDERS.filter(s => !userOrders.find(u => u.id === s.id));
    return [...userOrders, ...filteredSeeds];
  }

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find(o => o.id === id);
  }

  private getUserOrders(): Order[] {
    return JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]');
  }
}
