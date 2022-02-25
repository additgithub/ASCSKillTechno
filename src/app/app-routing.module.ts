import { AuthGuard } from './shared/authguard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  }, {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'upcominggames',  canActivate: [AuthGuard],
    loadChildren: () => import('./pages/upcominggames/upcominggames.module').then(m => m.UpcomingGamesPageModule)
  },
  {
    path: 'mygames',
    loadChildren: () => import('./pages/mygames/mygames.module').then(m => m.MyGamesPagPageModule)
  },
  {
    path: 'gameresultdetails/:GameID',
    loadChildren: () => import('./pages/gameresultdetails/gameresultdetails.module').then(m => m.GameResultDetailsPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then(m => m.walletPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule)
  },
  {
    path: 'settingscren',
    loadChildren: () => import('./pages/settingscren/settingscren.module').then(m => m.SettingScrenPageModule)
  },
  {
    path: 'reportissue',
    loadChildren: () => import('./pages/reportissue/reportissue.module').then(m => m.ReportIssuePageModule)
  },
  {
    path: 'contest/:GameID',
    loadChildren: () => import('./pages/contest/contest.module').then(m => m.ContestPageModule)
  },
  {
    path: 'mygamedetails/:GameID',
    loadChildren: () => import('./pages/mygamedetails/mygamedetails.module').then(m => m.MyGameDetailsPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./pages/aboutus/aboutus.module').then(m => m.AboutUsPageModule)
  },
  {
    path: 'howtoplay',
    loadChildren: () => import('./pages/howtoplay/howtoplay.module').then(m => m.HowToPlayPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./pages/faqs/faqs.module').then(m => m.FaqsPageModule)
  },
  {
    path: 'helpcenter',
    loadChildren: () => import('./pages/helpcenter/helpcenter.module').then(m => m.HelpCenterPageModule)
  },




  
  {
    path: 'brochure',
    loadChildren: () => import('./pages/brochure/brochure.module').then(m => m.BrochurePageModule)
  },
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
