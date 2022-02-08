import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthGuard } from './authguard.service';
import { DatePipe } from '@angular/common';
import { WelcomeGuard } from './welcomGuard.service';

import { Tools } from './tools';


@NgModule({
  // declarations: [TranslateModule],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule
    ],
  exports: [CommonModule, IonicModule,  ReactiveFormsModule],
  providers: [AuthGuard,WelcomeGuard, Tools, DatePipe]
})
export class SharedModule { }
