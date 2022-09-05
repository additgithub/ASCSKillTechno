import { ApiService } from 'src/app/services/api.service-new';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-walletfilter',
  templateUrl: './walletfilter.component.html',
  styleUrls: ['./walletfilter.component.scss'],
})
export class WalletFilterModelComponent  {
  ScriptID='';
  GameID='';
  GamePriceID='';

  UserSelectedValue=[];

  FROMDATE:any;
  TODATE:any;

  MaxDate: any = new Date().toISOString();



  today = new Date();
  constructor(public navParams: NavParams, public router: Router, private apiService: ApiService, public tools: Tools, public modalCtrl: ModalController) {
    this.ScriptID = this.navParams.get("ScriptID");
    this.GameID = this.navParams.get("GameID");
    this.GamePriceID = this.navParams.get("GamePriceID");
  

   
  }

  ionViewWillEnter() {
 

  //  this.GameJoinUserValue();
      console.log('Local FD > ', localStorage.getItem('FD'));

      if (localStorage.getItem('FD') !== null && localStorage.getItem('TD') !== null && localStorage.getItem('FD') !== ''  && localStorage.getItem('TD') !== '') {
        console.log('IF >>>>');

        console.log('Local FD > ', localStorage.getItem('FD'));

        console.log('Local TD > ', localStorage.getItem('TD'));
        this.FROMDATE=localStorage.getItem('FD');//2022-08-19T12:34:00+05:30
        this.TODATE=localStorage.getItem('TD');
      }else{
        console.log('ELSE >>>>');

        // console.log('Today > ', this.today); //Mon Aug 22 2022 12:21:59 GMT+0530 (India Standard Time)
        console.log('Today > ',moment(new Date()).format('YYYY-MM-DDThh:mm:ss+05:30'));
         this.FROMDATE= moment(new Date()).subtract(1,'d').format('YYYY-MM-DDThh:mm:ss+05:30');
         this.TODATE= moment(new Date()).format('YYYY-MM-DDThh:mm:ss+05:30');
    
      }

  }

  GameJoinUserValue() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("GameID", this.GameID);
      postData.append("ScriptID", this.ScriptID);
      postData.append("GamePriceID", this.GamePriceID);

      this.apiService.GameJoinUserValue(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' GameJoinUserValue > ', res);
        this.UserSelectedValue=res.data.joinusercontest
        
      }, (error: Response) => {
        this.tools.closeLoader();
        console.log(error);

        let err: any = error;
        this.tools.openAlertToken(err.status, err.error.message);
      });

    } else {
      this.tools.closeLoader();
    }

  }

  dismissModal() {
    this.modalCtrl.dismiss('');
  }
  close() {
    this.modalCtrl.dismiss('');
  }
  filter(){
    if(this.FROMDATE == undefined){
      this.tools.openNotification("Please Enter From Date")
    }else if(this.TODATE == undefined) {
      this.tools.openNotification("Please Enter To Date")
    }else{
      var ff=moment(this.FROMDATE).format('YYYY-MM-DD');
      var tt=moment(this.TODATE).format('YYYY-MM-DD');

      this.modalCtrl.dismiss({'FD':ff,"TD":tt});
      localStorage.setItem('FD',this.FROMDATE);
      localStorage.setItem('TD',this.TODATE);
      console.log('Local FD >>> ', localStorage.getItem('FD'));

      console.log('Local TD >>> ', localStorage.getItem('TD'));
    }
  }
}
