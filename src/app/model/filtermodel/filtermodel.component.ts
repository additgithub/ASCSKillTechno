import { ApiService } from 'src/app/services/api.service-new';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
@Component({
  selector: 'app-filtermodel',
  templateUrl: './filtermodel.component.html',
  styleUrls: ['./filtermodel.component.scss'],
})
export class FilterModelComponent  {
  ScriptID='';
  GameID='';
  GamePriceID='';

  UserSelectedValue=[];
  @ViewChild('rating') rating : any;

  constructor(public navParams: NavParams, public router: Router, private apiService: ApiService, public tools: Tools, public modalCtrl: ModalController) {
    this.ScriptID = this.navParams.get("ScriptID");
    this.GameID = this.navParams.get("GameID");
    this.GamePriceID = this.navParams.get("GamePriceID");
   
  }

  ionViewWillEnter() {
    this.GameJoinUserValue();
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

}
