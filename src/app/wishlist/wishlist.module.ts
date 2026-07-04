import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { WishlistPageRoutingModule } from './wishlist-routing.module';
import { WishlistPage } from './wishlist.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    WishlistPageRoutingModule
  ],
  declarations: [WishlistPage]
})
export class WishlistPageModule {}
