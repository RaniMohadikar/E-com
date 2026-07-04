import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealsPage } from './deals.page';

const routes: Routes = [
  { path: '', component: DealsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealsPageRoutingModule {}
