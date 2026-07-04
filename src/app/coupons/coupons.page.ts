import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discount: number;
  type: 'flat' | 'percent';
  minOrder: number;
  validTill: string;
  category: string;
  bgColor: string;
  iconColor: string;
  icon: string;
  used: boolean;
}

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage {
  selectedTab = 'all';

  coupons: Coupon[] = [
    {
      code: 'SAVE100', title: 'Flat ₹100 Off',
      description: 'Get ₹100 off on orders above ₹999',
      discount: 100, type: 'flat', minOrder: 999,
      validTill: '31 Jul 2026', category: 'All Products',
      bgColor: '#fff0e6', iconColor: '#FF6B02', icon: 'pricetag-outline', used: false
    },
    {
      code: 'FLAT200', title: 'Flat ₹200 Off',
      description: 'Save ₹200 on orders of ₹1,499 and above',
      discount: 200, type: 'flat', minOrder: 1499,
      validTill: '15 Aug 2026', category: 'All Products',
      bgColor: '#e8f4fd', iconColor: '#1a73e8', icon: 'wallet-outline', used: false
    },
    {
      code: 'OFF50', title: '50% Off Upto ₹500',
      description: '50% discount, maximum savings of ₹500',
      discount: 50, type: 'percent', minOrder: 799,
      validTill: '10 Aug 2026', category: 'All Products',
      bgColor: '#fde8e8', iconColor: '#eb445a', icon: 'gift-outline', used: false
    },
    {
      code: 'ELEC15', title: '15% Off on Electronics',
      description: 'Extra 15% off on all electronics products',
      discount: 15, type: 'percent', minOrder: 2000,
      validTill: '20 Jul 2026', category: 'Electronics',
      bgColor: '#e8fde8', iconColor: '#2dd36f', icon: 'phone-portrait-outline', used: false
    },
    {
      code: 'FASHION30', title: '30% Off on Fashion',
      description: 'Get 30% off on Men & Women clothing',
      discount: 30, type: 'percent', minOrder: 599,
      validTill: '31 Jul 2026', category: 'Fashion',
      bgColor: '#fce8f4', iconColor: '#e91e8c', icon: 'shirt-outline', used: false
    },
    {
      code: 'HOME250', title: '₹250 Off on Home & Kitchen',
      description: 'Flat ₹250 off on home & kitchen orders above ₹1,200',
      discount: 250, type: 'flat', minOrder: 1200,
      validTill: '05 Aug 2026', category: 'Home & Kitchen',
      bgColor: '#fdf4e8', iconColor: '#c09a00', icon: 'home-outline', used: false
    },
    {
      code: 'NEWUSER', title: 'New User Special',
      description: 'Exclusive 20% off for first-time shoppers',
      discount: 20, type: 'percent', minOrder: 0,
      validTill: 'One-time use', category: 'All Products',
      bgColor: '#f0e8fd', iconColor: '#6c63ff', icon: 'sparkles-outline', used: false
    },
    {
      code: 'SPORT40', title: '₹40 Off on Sports',
      description: 'Save on sports & fitness products above ₹800',
      discount: 40, type: 'flat', minOrder: 800,
      validTill: '25 Jul 2026', category: 'Sports & Fitness',
      bgColor: '#e8fde8', iconColor: '#2dd36f', icon: 'fitness-outline', used: false
    },
  ];

  get filteredCoupons(): Coupon[] {
    if (this.selectedTab === 'all') return this.coupons;
    if (this.selectedTab === 'flat') return this.coupons.filter(c => c.type === 'flat');
    if (this.selectedTab === 'percent') return this.coupons.filter(c => c.type === 'percent');
    return this.coupons;
  }

  constructor(
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async copyCoupon(coupon: Coupon) {
    try {
      await navigator.clipboard.writeText(coupon.code);
    } catch {}
    const toast = await this.toastCtrl.create({
      message: `Coupon "${coupon.code}" copied! Apply it in cart.`,
      duration: 2000,
      color: 'dark',
      position: 'bottom'
    });
    await toast.present();
  }

  applyAndGoToCart(coupon: Coupon) {
    this.router.navigate(['/cart'], { state: { coupon: coupon.code } });
  }

  discountLabel(c: Coupon): string {
    return c.type === 'flat' ? `₹${c.discount} OFF` : `${c.discount}% OFF`;
  }
}
