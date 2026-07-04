import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  category: string;
  subcategory: string;
  icon: string;
  bgColor: string;
  colors: { name: string; hex: string }[];
  inStock: boolean;
  isFlashDeal: boolean;
  isFeatured: boolean;
  tags: string[];
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1, name: 'boAt Rockerz 450 Wireless Headphones',
    description: 'Experience premium wireless audio with 40mm drivers, 15-hour playtime, and comfortable over-ear design perfect for music, gaming, and calls.',
    price: 1499, originalPrice: 2999, discount: 50, rating: 4.2, reviews: 72456,
    category: 'Electronics', subcategory: 'Headphones',
    icon: 'headset-outline', bgColor: '#1a1a2e',
    colors: [{ name: 'Black', hex: '#222' }, { name: 'Blue', hex: '#1a73e8' }],
    inStock: true, isFlashDeal: true, isFeatured: true, tags: ['wireless', 'headphones', 'audio']
  },
  {
    id: 2, name: 'Fastrack Analog Watch for Men',
    description: 'Classic analog timepiece with stainless steel strap. Water resistant, scratch-proof glass, and precise quartz movement.',
    price: 1195, originalPrice: 2495, discount: 52, rating: 4.5, reviews: 18340,
    category: 'Electronics', subcategory: 'Smart Watches',
    icon: 'watch-outline', bgColor: '#2c3e50',
    colors: [{ name: 'Silver', hex: '#aaa' }, { name: 'Black', hex: '#222' }],
    inStock: true, isFlashDeal: true, isFeatured: false, tags: ['watch', 'men', 'analog']
  },
  {
    id: 3, name: 'Sony WF-1000XM4 Noise Cancelling Earbuds',
    description: 'Industry-leading noise cancelling with 8-hour battery, wireless charging, LDAC support and crystal-clear call quality.',
    price: 9999, originalPrice: 19999, discount: 50, rating: 4.7, reviews: 31200,
    category: 'Electronics', subcategory: 'Headphones',
    icon: 'musical-notes-outline', bgColor: '#2d2d2d',
    colors: [{ name: 'Black', hex: '#222' }, { name: 'White', hex: '#f5f5f5' }],
    inStock: true, isFlashDeal: true, isFeatured: true, tags: ['sony', 'earbuds', 'noise-cancelling']
  },
  {
    id: 4, name: 'Samsung Galaxy M34 5G',
    description: '6000mAh battery, 6.5" Super AMOLED display, 108MP triple camera, and blazing-fast 5G connectivity.',
    price: 15999, originalPrice: 24999, discount: 36, rating: 4.3, reviews: 45210,
    category: 'Electronics', subcategory: 'Mobile Phones',
    icon: 'phone-portrait-outline', bgColor: '#0a3d62',
    colors: [{ name: 'Blue', hex: '#0a3d62' }, { name: 'Green', hex: '#1e8449' }],
    inStock: true, isFlashDeal: false, isFeatured: true, tags: ['samsung', 'smartphone', '5g']
  },
  {
    id: 5, name: 'Apple MacBook Air M2',
    description: 'Supercharged by M2 chip with 13.6" Liquid Retina display, 18-hour battery, fanless design in an ultra-thin body.',
    price: 89999, originalPrice: 114900, discount: 22, rating: 4.8, reviews: 12400,
    category: 'Electronics', subcategory: 'Laptops',
    icon: 'laptop-outline', bgColor: '#95a5a6',
    colors: [{ name: 'Silver', hex: '#aaa' }, { name: 'Space Grey', hex: '#2c3e50' }],
    inStock: true, isFlashDeal: false, isFeatured: true, tags: ['apple', 'macbook', 'laptop']
  },
  {
    id: 6, name: 'boAt Aavante Bar 1700D Soundbar',
    description: '120W RMS soundbar with Dolby Audio, wireless subwoofer, HDMI ARC and Bluetooth 5.0 for cinema-like experience.',
    price: 3999, originalPrice: 8990, discount: 55, rating: 4.1, reviews: 8920,
    category: 'Electronics', subcategory: 'Speakers',
    icon: 'volume-high-outline', bgColor: '#1a252f',
    colors: [{ name: 'Black', hex: '#222' }],
    inStock: true, isFlashDeal: true, isFeatured: false, tags: ['soundbar', 'audio', 'home-theater']
  },
  {
    id: 7, name: "Van Heusen Men's Slim Fit Shirt",
    description: 'Premium cotton slim-fit formal shirt, wrinkle-resistant with modern collar design. Machine washable.',
    price: 799, originalPrice: 1799, discount: 56, rating: 4.3, reviews: 22100,
    category: 'Men', subcategory: 'Shirts',
    icon: 'shirt-outline', bgColor: '#2980b9',
    colors: [{ name: 'Blue', hex: '#2980b9' }, { name: 'White', hex: '#ecf0f1' }, { name: 'Black', hex: '#222' }],
    inStock: true, isFlashDeal: false, isFeatured: true, tags: ['shirt', 'men', 'formal']
  },
  {
    id: 8, name: "Levi's 511 Slim Fit Jeans",
    description: "Classic slim-fit jeans in stretch denim for all-day comfort. Iconic 5-pocket styling with a modern silhouette.",
    price: 1799, originalPrice: 3999, discount: 55, rating: 4.4, reviews: 56780,
    category: 'Men', subcategory: 'Jeans',
    icon: 'file-tray-outline', bgColor: '#1a5276',
    colors: [{ name: 'Dark Blue', hex: '#1a5276' }, { name: 'Black', hex: '#222' }],
    inStock: true, isFlashDeal: true, isFeatured: false, tags: ['jeans', 'men', 'levis']
  },
  {
    id: 9, name: 'Nike Air Max 270 Running Shoes',
    description: 'Lightweight running shoes with Max Air cushioning for all-day comfort. Breathable mesh upper and durable rubber outsole.',
    price: 5999, originalPrice: 9999, discount: 40, rating: 4.6, reviews: 34560,
    category: 'Men', subcategory: 'Shoes',
    icon: 'footsteps-outline', bgColor: '#c0392b',
    colors: [{ name: 'Red/Black', hex: '#c0392b' }, { name: 'White/Blue', hex: '#2980b9' }],
    inStock: true, isFlashDeal: false, isFeatured: true, tags: ['nike', 'shoes', 'running']
  },
  {
    id: 10, name: 'Puma Unisex Backpack Navy Blue',
    description: '25L capacity backpack with padded laptop compartment, multiple pockets, and ergonomic shoulder straps.',
    price: 889, originalPrice: 1799, discount: 51, rating: 4.1, reviews: 9210,
    category: 'Men', subcategory: 'Bags',
    icon: 'bag-outline', bgColor: '#1e3a5f',
    colors: [{ name: 'Navy Blue', hex: '#1e3a5f' }, { name: 'Black', hex: '#222' }],
    inStock: true, isFlashDeal: true, isFeatured: false, tags: ['puma', 'backpack', 'bag']
  },
  {
    id: 11, name: "Libas Women's Printed Kurta Set",
    description: 'Beautiful printed straight kurta with matching palazzo pants. Comfortable rayon fabric for all-day wear.',
    price: 699, originalPrice: 1499, discount: 53, rating: 4.2, reviews: 15600,
    category: 'Women', subcategory: 'Tops',
    icon: 'woman-outline', bgColor: '#8e44ad',
    colors: [{ name: 'Purple', hex: '#8e44ad' }, { name: 'Pink', hex: '#e91e8c' }, { name: 'Blue', hex: '#2980b9' }],
    inStock: true, isFlashDeal: false, isFeatured: true, tags: ['kurta', 'women', 'ethnic']
  },
  {
    id: 12, name: "Wildcraft Women's Sports Shoes",
    description: 'Lightweight sports shoes with memory foam insole, breathable mesh upper, and anti-slip rubber outsole.',
    price: 1299, originalPrice: 2999, discount: 57, rating: 4.0, reviews: 7890,
    category: 'Women', subcategory: 'Footwear',
    icon: 'footsteps-outline', bgColor: '#c0392b',
    colors: [{ name: 'Pink', hex: '#e91e8c' }, { name: 'Blue', hex: '#2980b9' }],
    inStock: true, isFlashDeal: true, isFeatured: false, tags: ['sports shoes', 'women', 'wildcraft']
  },
  {
    id: 13, name: 'Gold & Diamond Solitaire Ring',
    description: '18K gold ring with certified diamond solitaire. Hallmarked purity, comes with authenticity certificate.',
    price: 12999, originalPrice: 18000, discount: 28, rating: 4.8, reviews: 3400,
    category: 'Women', subcategory: 'Jewellery',
    icon: 'diamond-outline', bgColor: '#f39c12',
    colors: [{ name: 'Gold', hex: '#f39c12' }, { name: 'Rose Gold', hex: '#e07b54' }],
    inStock: true, isFlashDeal: false, isFeatured: true, tags: ['ring', 'diamond', 'gold']
  },
  {
    id: 14, name: 'Prestige 2000W Induction Cooktop',
    description: '2000W induction cooktop with 7 preset menus, auto-shutoff, child-lock safety feature and 2-year warranty.',
    price: 1999, originalPrice: 3999, discount: 50, rating: 4.3, reviews: 21340,
    category: 'Home & Kitchen', subcategory: 'Cookware',
    icon: 'flame-outline', bgColor: '#2c3e50',
    colors: [{ name: 'Black', hex: '#222' }],
    inStock: true, isFlashDeal: true, isFeatured: false, tags: ['induction', 'cooktop', 'kitchen']
  },
  {
    id: 15, name: 'Modular 5-Tier Shelf Unit',
    description: '5-tier adjustable wooden shelf unit with metal frame. Holds up to 150kg. Easy assembly, no tools required.',
    price: 4999, originalPrice: 8999, discount: 44, rating: 4.5, reviews: 6780,
    category: 'Home & Kitchen', subcategory: 'Furniture',
    icon: 'cube-outline', bgColor: '#7f8c8d',
    colors: [{ name: 'White', hex: '#ecf0f1' }, { name: 'Brown', hex: '#8b4513' }],
    inStock: true, isFlashDeal: false, isFeatured: true, tags: ['shelf', 'furniture', 'storage']
  },
  {
    id: 16, name: 'Philips Smart LED Bulb Pack of 4',
    description: '16 million colors, voice-assistant compatible, 9W = 60W equivalent. Control via app or voice command.',
    price: 799, originalPrice: 1499, discount: 47, rating: 4.4, reviews: 12100,
    category: 'Home & Kitchen', subcategory: 'Lighting',
    icon: 'bulb-outline', bgColor: '#f1c40f',
    colors: [{ name: 'White Light', hex: '#ecf0f1' }],
    inStock: true, isFlashDeal: true, isFeatured: false, tags: ['philips', 'led', 'smart-home']
  },
  {
    id: 17, name: 'Lakme Absolute Matte Lipstick',
    description: 'Long-lasting matte formula for 16-hour wear. Enriched with Vitamin E for moisturized, kissable lips.',
    price: 299, originalPrice: 599, discount: 50, rating: 4.1, reviews: 34560,
    category: 'Beauty & Health', subcategory: 'Makeup',
    icon: 'rose-outline', bgColor: '#c0392b',
    colors: [{ name: 'Scarlet Red', hex: '#c0392b' }, { name: 'Dusty Pink', hex: '#e91e8c' }, { name: 'Maroon', hex: '#7b241c' }],
    inStock: true, isFlashDeal: true, isFeatured: false, tags: ['lakme', 'lipstick', 'makeup']
  },
  {
    id: 18, name: 'Himalaya Purifying Neem Face Wash',
    description: 'Gentle purifying neem face wash that removes dirt and excess oil while maintaining skin moisture balance.',
    price: 149, originalPrice: 299, discount: 50, rating: 4.5, reviews: 89200,
    category: 'Beauty & Health', subcategory: 'Skincare',
    icon: 'sparkles-outline', bgColor: '#27ae60',
    colors: [{ name: 'Green', hex: '#27ae60' }],
    inStock: true, isFlashDeal: false, isFeatured: true, tags: ['himalaya', 'face-wash', 'skincare']
  },
  {
    id: 19, name: 'Fitbit Inspire 3 Fitness Band',
    description: '24/7 heart rate monitoring, sleep tracking, SpO2 sensor, stress management, and 10-day battery life.',
    price: 5999, originalPrice: 9999, discount: 40, rating: 4.6, reviews: 18900,
    category: 'Sports & Fitness', subcategory: 'Equipment',
    icon: 'fitness-outline', bgColor: '#16a085',
    colors: [{ name: 'Teal', hex: '#16a085' }, { name: 'Black', hex: '#222' }, { name: 'Pink', hex: '#e91e8c' }],
    inStock: true, isFlashDeal: true, isFeatured: true, tags: ['fitbit', 'fitness', 'smartband']
  },
  {
    id: 20, name: 'Cosco Pro Football Size 5',
    description: 'FIFA-approved hand-stitched football with butyl bladder for consistent air retention. Official match size.',
    price: 599, originalPrice: 999, discount: 40, rating: 4.2, reviews: 5670,
    category: 'Sports & Fitness', subcategory: 'Equipment',
    icon: 'football-outline', bgColor: '#2c3e50',
    colors: [{ name: 'Black/White', hex: '#222' }],
    inStock: true, isFlashDeal: false, isFeatured: false, tags: ['football', 'sports', 'cosco']
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {

  getAll(): Product[] {
    return MOCK_PRODUCTS;
  }

  getById(id: number): Product | undefined {
    return MOCK_PRODUCTS.find(p => p.id === id);
  }

  getFlashDeals(): Product[] {
    return MOCK_PRODUCTS.filter(p => p.isFlashDeal);
  }

  getFeatured(): Product[] {
    return MOCK_PRODUCTS.filter(p => p.isFeatured);
  }

  getByCategory(category: string): Product[] {
    return MOCK_PRODUCTS.filter(p => p.category === category);
  }

  getByCategoryAndSub(category: string, subcategory: string): Product[] {
    return MOCK_PRODUCTS.filter(p => p.category === category && p.subcategory === subcategory);
  }

  search(term: string): Product[] {
    const t = term.toLowerCase();
    return MOCK_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(t) ||
      p.category.toLowerCase().includes(t) ||
      p.subcategory.toLowerCase().includes(t) ||
      p.tags.some(tag => tag.includes(t))
    );
  }

  getCategories(): string[] {
    return [...new Set(MOCK_PRODUCTS.map(p => p.category))];
  }

  getSubcategories(category: string): string[] {
    return [...new Set(MOCK_PRODUCTS.filter(p => p.category === category).map(p => p.subcategory))];
  }
}
