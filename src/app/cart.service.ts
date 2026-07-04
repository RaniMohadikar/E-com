import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  icon: string;
  bgColor: string;
  color: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  items: CartItem[] = [];

  addItem(item: CartItem) {
    const existing = this.items.find(i => i.id === item.id && i.color === item.color);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      this.items.push({ ...item, quantity: item.quantity || 1 });
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }

  increment(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) item.quantity++;
  }

  decrement(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      if (item.quantity > 1) item.quantity--;
      else this.removeItem(id);
    }
  }

  clearCart() {
    this.items = [];
  }

  getSubtotal(): number {
    return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  }

  getCount(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }
}
