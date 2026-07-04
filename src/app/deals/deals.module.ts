import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DealsPageRoutingModule } from './deals-routing.module';
import { DealsPage } from './deals.page';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, DealsPageRoutingModule],
  declarations: [DealsPage]
})
export class DealsPageModule {}
