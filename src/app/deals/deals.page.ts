import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {
  allDeals: Product[] = [];
  filteredDeals: Product[] = [];
  selectedFilter = 'all';
  sortBy = 'discount';

  filters = [
    { label: 'All', value: 'all' },
    { label: '30%+', value: '30' },
    { label: '40%+', value: '40' },
    { label: '50%+', value: '50' },
  ];

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.allDeals = this.productService.getAll()
      .filter(p => p.discount >= 10)
      .sort((a, b) => b.discount - a.discount);
    this.filteredDeals = [...this.allDeals];
  }

  applyFilter(value: string) {
    this.selectedFilter = value;
    const minDiscount = value === 'all' ? 0 : Number(value);
    this.filteredDeals = this.allDeals.filter(p => p.discount >= minDiscount);
    if (this.sortBy === 'discount') {
      this.filteredDeals.sort((a, b) => b.discount - a.discount);
    } else if (this.sortBy === 'price_low') {
      this.filteredDeals.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'rating') {
      this.filteredDeals.sort((a, b) => b.rating - a.rating);
    }
  }

  onSortChange(event: any) {
    this.sortBy = event.detail.value;
    this.applyFilter(this.selectedFilter);
  }

  openProduct(p: Product) {
    this.router.navigateByUrl(`/single-product/${p.id}`);
  }

  isWishlisted(id: number) {
    return this.wishlistService.isInWishlist(id);
  }

  toggleWishlist(p: Product, event: Event) {
    event.stopPropagation();
    this.wishlistService.toggle(p.id);
  }

  async addToCart(p: Product, event: Event) {
    event.stopPropagation();
    this.cartService.addItem({
      id: p.id, name: p.name, price: p.price,
      category: p.category, icon: p.icon, bgColor: p.bgColor,
      color: p.colors[0]?.name || '', quantity: 1
    });
    const toast = await this.toastCtrl.create({ message: 'Added to cart!', duration: 1200, color: 'dark' });
    await toast.present();
  }

  savedAmount(p: Product): number {
    return p.originalPrice - p.price;
  }
}
