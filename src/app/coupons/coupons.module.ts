import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CouponsPageRoutingModule } from './coupons-routing.module';
import { CouponsPage } from './coupons.page';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, CouponsPageRoutingModule],
  declarations: [CouponsPage]
})
export class CouponsPageModule {}
