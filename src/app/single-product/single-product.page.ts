import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { ProductService, Product } from '../services/product.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.page.html',
  styleUrls: ['./single-product.page.scss'],
})
export class SingleProductPage implements OnInit {
  product!: Product;
  quantity = 1;
  selectedColor = '';
  isWishlisted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 1;
    const found = this.productService.getById(id);
    this.product = found || this.productService.getAll()[0];
    this.selectedColor = this.product.colors[0]?.name || '';
    this.isWishlisted = this.wishlistService.isInWishlist(this.product.id);
  }

  selectColor(name: string) {
    this.selectedColor = name;
  }

  increment() { this.quantity++; }

  decrement() { if (this.quantity > 1) this.quantity--; }

  toggleWishlist() {
    this.isWishlisted = this.wishlistService.toggle(this.product.id);
    this.showToast(this.isWishlisted ? 'Added to Wishlist ❤️' : 'Removed from Wishlist');
  }

  async addToCart() {
    this.cartService.addItem({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      category: this.product.category,
      icon: this.product.icon,
      bgColor: this.product.bgColor,
      color: this.selectedColor,
      quantity: this.quantity
    });
    await this.showToast('Added to cart!');
    this.router.navigateByUrl('/cart');
  }

  buyNow() {
    this.cartService.addItem({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      category: this.product.category,
      icon: this.product.icon,
      bgColor: this.product.bgColor,
      color: this.selectedColor,
      quantity: this.quantity
    });
    this.router.navigateByUrl('/cart');
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
