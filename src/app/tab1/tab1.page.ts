import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ProductService, Product } from '../services/product.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  hours = '02'; minutes = '45'; seconds = '30';
  private timer: any;

  deliveryCity = 'New Delhi, India';

  searchTerm = '';
  searchResults: Product[] = [];
  isSearching = false;

  flashProducts: Product[] = [];
  featuredProducts: Product[] = [];

  get cartCount() { return this.cartService.getCount(); }

  quickAccess = [
    { name: 'Categories', icon: 'grid-outline', bg: '#fff0e6', color: '#FF6B02', route: '/tabs/tab2' },
    { name: 'Top Brands', icon: 'ribbon-outline', bg: '#e6f0ff', color: '#3880ff', route: '/deals' },
    { name: 'Deals', icon: 'pricetag-outline', bg: '#e6fff0', color: '#2dd36f', route: '/deals' },
    { name: 'Coupons', icon: 'ticket-outline', bg: '#fff0f0', color: '#eb445a', route: '/coupons' },
  ];

  popularCategories = [
    { name: 'Men', icon: 'man-outline', bg: '#e8f4fd', color: '#1a73e8', cat: 'Men' },
    { name: 'Women', icon: 'woman-outline', bg: '#fce8f4', color: '#e91e8c', cat: 'Women' },
    { name: 'Electronics', icon: 'phone-portrait-outline', bg: '#e8fde8', color: '#2dd36f', cat: 'Electronics' },
    { name: 'Home', icon: 'home-outline', bg: '#fdf4e8', color: '#FF6B02', cat: 'Home & Kitchen' },
  ];

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.flashProducts = this.productService.getFlashDeals();
    this.featuredProducts = this.productService.getFeatured();
    this.startTimer();
  }

  ionViewWillEnter() {
    // Update delivery city from saved location
    const saved = localStorage.getItem('SAVED_LOCATION');
    if (saved) {
      const loc = JSON.parse(saved);
      this.deliveryCity = loc.address?.split(',').slice(0, 2).join(',').trim() || 'My Location';
    }
  }

  ngOnDestroy() { clearInterval(this.timer); }

  startTimer() {
    let total = 2 * 3600 + 45 * 60 + 30;
    this.timer = setInterval(() => {
      if (total <= 0) { clearInterval(this.timer); return; }
      total--;
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      this.hours = String(h).padStart(2, '0');
      this.minutes = String(m).padStart(2, '0');
      this.seconds = String(s).padStart(2, '0');
    }, 1000);
  }

  onSearch(event: any) {
    const term = event.target?.value?.trim() || '';
    this.searchTerm = term;
    if (term.length > 1) {
      this.isSearching = true;
      this.searchResults = this.productService.search(term);
    } else {
      this.isSearching = false;
      this.searchResults = [];
    }
  }

  openProduct(product: Product) {
    this.router.navigate(['/single-product', product.id]);
  }

  isWishlisted(id: number): boolean {
    return this.wishlistService.isInWishlist(id);
  }

  toggleWishlist(product: Product, event: Event) {
    event.stopPropagation();
    this.wishlistService.toggle(product.id);
  }

  openCategory(cat: string) {
    this.router.navigate(['/tabs/tab2'], { state: { category: cat } });
  }

  navigate(route: string) {
    if (route) this.router.navigateByUrl(route);
  }
}
