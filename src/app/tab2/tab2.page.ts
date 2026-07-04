import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  selectedCategoryIndex = 0;
  selectedSubcategory = '';

  categories = [
    { name: 'Electronics', icon: 'phone-portrait-outline' },
    { name: 'Men', icon: 'man-outline' },
    { name: 'Women', icon: 'woman-outline' },
    { name: 'Home & Kitchen', icon: 'home-outline' },
    { name: 'Beauty & Health', icon: 'heart-outline' },
    { name: 'Sports & Fitness', icon: 'fitness-outline' },
  ];

  subcategoryIcons: Record<string, string> = {
    'Headphones': 'headset-outline', 'Smart Watches': 'watch-outline',
    'Mobile Phones': 'phone-portrait-outline', 'Laptops': 'laptop-outline',
    'Speakers': 'volume-high-outline', 'Cameras': 'camera-outline',
    'Shirts': 'shirt-outline', 'Jeans': 'file-tray-outline',
    'Shoes': 'footsteps-outline', 'Bags': 'bag-outline',
    'Tops': 'woman-outline', 'Footwear': 'footsteps-outline',
    'Jewellery': 'diamond-outline', 'Dresses': 'color-palette-outline',
    'Cookware': 'flame-outline', 'Furniture': 'cube-outline',
    'Lighting': 'bulb-outline', 'Makeup': 'rose-outline',
    'Skincare': 'sparkles-outline', 'Equipment': 'fitness-outline',
  };

  subcategoryColors: Record<string, { bg: string; color: string }> = {
    'Headphones':    { bg: '#e8fde8', color: '#2dd36f' },
    'Smart Watches': { bg: '#fdf4e8', color: '#FF6B02' },
    'Mobile Phones': { bg: '#e8f4fd', color: '#1a73e8' },
    'Laptops':       { bg: '#fce8f4', color: '#e91e8c' },
    'Speakers':      { bg: '#fde8e8', color: '#eb445a' },
    'Cameras':       { bg: '#fdf8e8', color: '#c09a00' },
    'Shirts':        { bg: '#e8f4fd', color: '#1a73e8' },
    'Jeans':         { bg: '#e8fde8', color: '#2dd36f' },
    'Shoes':         { bg: '#fdf4e8', color: '#FF6B02' },
    'Bags':          { bg: '#fde8e8', color: '#eb445a' },
    'Tops':          { bg: '#fce8f4', color: '#e91e8c' },
    'Footwear':      { bg: '#fdf4e8', color: '#FF6B02' },
    'Jewellery':     { bg: '#f0e8fd', color: '#6c63ff' },
    'Dresses':       { bg: '#fce8f4', color: '#e91e8c' },
    'Cookware':      { bg: '#fde8e8', color: '#eb445a' },
    'Furniture':     { bg: '#fdf4e8', color: '#FF6B02' },
    'Lighting':      { bg: '#fdf8e8', color: '#c09a00' },
    'Makeup':        { bg: '#fde8e8', color: '#eb445a' },
    'Skincare':      { bg: '#fce8f4', color: '#e91e8c' },
    'Equipment':     { bg: '#e8fde8', color: '#2dd36f' },
  };

  get currentCategory(): string {
    return this.categories[this.selectedCategoryIndex]?.name || '';
  }

  get subcategories(): string[] {
    return this.productService.getSubcategories(this.currentCategory);
  }

  get displayProducts(): Product[] {
    if (this.selectedSubcategory) {
      return this.productService.getByCategoryAndSub(this.currentCategory, this.selectedSubcategory);
    }
    return this.productService.getByCategory(this.currentCategory);
  }

  constructor(
    private router: Router,
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const state = history.state;
    if (state?.category) {
      const idx = this.categories.findIndex(c => c.name === state.category);
      if (idx !== -1) {
        this.selectedCategoryIndex = idx;
        this.selectedSubcategory = '';
      }
    }
  }

  selectCategory(index: number) {
    this.selectedCategoryIndex = index;
    this.selectedSubcategory = '';
  }

  selectSubcategory(sub: string) {
    this.selectedSubcategory = this.selectedSubcategory === sub ? '' : sub;
  }

  openProduct(p: Product) {
    this.router.navigate(['/single-product', p.id]);
  }

  isWishlisted(id: number): boolean {
    return this.wishlistService.isInWishlist(id);
  }

  toggleWishlist(p: Product, event: Event) {
    event.stopPropagation();
    this.wishlistService.toggle(p.id);
  }

  getSubIcon(sub: string): string {
    return this.subcategoryIcons[sub] || 'pricetag-outline';
  }

  getSubStyle(sub: string) {
    return this.subcategoryColors[sub] || { bg: '#f5f5f5', color: '#888' };
  }
}
