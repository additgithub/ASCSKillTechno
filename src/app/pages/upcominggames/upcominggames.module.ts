import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpcomingGamesPage } from './upcominggames.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingGamesPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [UpcomingGamesPage]
})
export class UpcomingGamesPageModule {}
