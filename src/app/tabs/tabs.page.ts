import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  get cartCount() {
    return this.cartService.getCount();
  }

  constructor(private router: Router, private cartService: CartService) {}

  goToCart() {
    this.router.navigateByUrl('/cart');
  }
}
