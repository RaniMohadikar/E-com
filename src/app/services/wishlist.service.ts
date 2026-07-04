import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly KEY = 'WISHLIST';

  private getIds(): number[] {
    return JSON.parse(localStorage.getItem(this.KEY) || '[]');
  }

  private save(ids: number[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(ids));
  }

  toggle(productId: number): boolean {
    const ids = this.getIds();
    const idx = ids.indexOf(productId);
    if (idx === -1) {
      ids.push(productId);
      this.save(ids);
      return true;
    } else {
      ids.splice(idx, 1);
      this.save(ids);
      return false;
    }
  }

  isInWishlist(productId: number): boolean {
    return this.getIds().includes(productId);
  }

  getWishlist(): number[] {
    return this.getIds();
  }

  getCount(): number {
    return this.getIds().length;
  }
}
