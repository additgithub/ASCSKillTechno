import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'upcominggames',
        loadChildren: () => import('../../../app/pages/upcominggames/upcominggames.module').then(m => m.UpcomingGamesPageModule)
      },
      {
        path: 'mygames',
        loadChildren: () => import('../../../app/pages/mygames/mygames.module').then(m => m.MyGamesPagPageModule)
      },
      {
        path: '',
        redirectTo: '/home/upcominggames',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/upcominggames',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
