import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReportIssuePage } from './reportissue.page';

const routes: Routes = [
  {
    path: '',
    component: ReportIssuePage,
  }
];

@NgModule({
  imports: [
    SharedModule,    FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [ReportIssuePage]
})
export class ReportIssuePageModule {}
