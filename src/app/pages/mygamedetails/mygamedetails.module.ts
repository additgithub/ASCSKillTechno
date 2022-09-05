import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyGameDetailsPage } from './mygamedetails.page';

const routes: Routes = [
  {
    path: '',
    component: MyGameDetailsPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [MyGameDetailsPage]
})
export class MyGameDetailsPageModule {}
