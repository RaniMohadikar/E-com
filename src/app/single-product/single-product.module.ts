import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleProductPageRoutingModule } from './single-product-routing.module';

import { SingleProductPage } from './single-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleProductPageRoutingModule
  ],
  declarations: [SingleProductPage]
})
export class SingleProductPageModule {}
