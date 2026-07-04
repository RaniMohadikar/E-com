import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { WishlistService } from '../services/wishlist.service';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage {
  products: Product[] = [];

  constructor(
    private wishlistService: WishlistService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    this.loadWishlist();
  }

  loadWishlist() {
    const ids = this.wishlistService.getWishlist();
    this.products = ids
      .map(id => this.productService.getById(id))
      .filter((p): p is Product => !!p);
  }

  openProduct(product: Product) {
    this.router.navigateByUrl(`/single-product/${product.id}`);
  }

  removeFromWishlist(product: Product, event: Event) {
    event.stopPropagation();
    this.wishlistService.toggle(product.id);
    this.loadWishlist();
    this.showToast('Removed from Wishlist');
  }

  async addToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.cartService.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      icon: product.icon,
      bgColor: product.bgColor,
      color: product.colors[0]?.name || '',
      quantity: 1
    });
    await this.showToast('Added to cart!');
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}
