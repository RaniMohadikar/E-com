import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleProductPage } from './single-product.page';

const routes: Routes = [
  {
    path: '',
    component: SingleProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleProductPageRoutingModule {}
