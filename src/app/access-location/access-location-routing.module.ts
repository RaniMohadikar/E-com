import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessLocationPage } from './access-location.page';

const routes: Routes = [
  {
    path: '',
    component: AccessLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessLocationPageRoutingModule {}
