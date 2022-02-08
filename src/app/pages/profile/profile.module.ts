import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePage } from './profile.page';


const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [ProfilePage]
})

export class ProfilePageModule {}
