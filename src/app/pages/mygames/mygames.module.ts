import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyGamesPage } from './mygames.page';

const routes: Routes = [
  {
    path: '',
    component: MyGamesPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [MyGamesPage]
})
export class MyGamesPagPageModule {}
