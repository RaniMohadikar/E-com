import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  couponCode = '';
  discount = 0;
  couponError = '';
  couponSuccess = '';

  private validCoupons: Record<string, number> = {
    'SAVE100': 100,
    'FLAT200': 200,
    'OFF50': 50,
  };

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  applyCoupon() {
    const code = this.couponCode.trim().toUpperCase();
    this.couponError = '';
    this.couponSuccess = '';

    if (!code) {
      this.couponError = 'Please enter a coupon code.';
      return;
    }

    if (this.validCoupons[code]) {
      this.discount = this.validCoupons[code];
      this.couponSuccess = `Coupon applied! You save ₹${this.discount}`;
    } else {
      this.discount = 0;
      this.couponError = 'Invalid coupon code. Try SAVE100, FLAT200 or OFF50.';
    }
  }

  async checkout() {
    if (this.cartService.items.length === 0) return;
    const order = this.orderService.placeOrder(
      this.cartService.items,
      this.cartService.getSubtotal(),
      this.discount
    );
    this.cartService.clearCart();
    this.discount = 0;
    this.couponCode = '';

    const toast = await this.toastCtrl.create({
      message: `Order #${order.id} placed successfully! 🎉`,
      duration: 2500,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
    this.router.navigateByUrl('/orders', { replaceUrl: true });
  }
}
