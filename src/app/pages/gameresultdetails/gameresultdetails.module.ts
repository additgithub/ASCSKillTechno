import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameResultDetailsPage } from './gameresultdetails.page';

const routes: Routes = [
  {
    path: '',
    component: GameResultDetailsPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [GameResultDetailsPage]
})
export class GameResultDetailsPageModule {}
