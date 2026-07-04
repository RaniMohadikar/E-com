import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user: User | null = null;
  orderCount = 0;
  wishlistCount = 0;
  cartCount = 0;

  menuItems: Array<{label: string; icon: string; bg: string; color: string; route: string; badge: number | null}> = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
    this.cdr.detectChanges();
  }

  loadData() {
    // Always read fresh from localStorage
    this.user = this.authService.getCurrentUser();

    // If not logged in, redirect to login
    if (!this.user) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return;
    }

    this.orderCount = this.orderService.getOrders().length;
    this.wishlistCount = this.wishlistService.getCount();
    this.cartCount = this.cartService.getCount();

    this.menuItems = [
      { label: 'My Orders',        icon: 'receipt-outline',           bg: '#fff0e6', color: '#FF6B02', route: '/orders',       badge: this.orderCount || null },
      { label: 'Wishlist',          icon: 'heart-outline',             bg: '#fde8e8', color: '#eb445a', route: '/wishlist',      badge: this.wishlistCount || null },
      { label: 'Addresses',         icon: 'location-outline',          bg: '#e8f4fd', color: '#1a73e8', route: '',              badge: null },
      { label: 'Payment Methods',   icon: 'card-outline',              bg: '#e8fde8', color: '#2dd36f', route: '',              badge: null },
      { label: 'Coupons',           icon: 'ticket-outline',            bg: '#fdf4e8', color: '#c09a00', route: '/coupons',      badge: null },
      { label: 'Notifications',     icon: 'notifications-outline',     bg: '#f0e8fd', color: '#6c63ff', route: '/notification', badge: null },
      { label: 'Help & Support',    icon: 'help-circle-outline',       bg: '#e8f8fd', color: '#0abfbc', route: '',              badge: null },
      { label: 'About Us',          icon: 'information-circle-outline',bg: '#f5f5f5', color: '#888',    route: '',              badge: null },
    ];

    this.cdr.detectChanges();
  }

  navigate(route: string) {
    if (route) this.router.navigateByUrl(route);
  }

  editProfile() {
    this.router.navigateByUrl('/edit-profile');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
