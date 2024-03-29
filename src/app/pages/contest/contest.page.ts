import { ModalController } from '@ionic/angular';
import { FilterModelComponent } from './../../model/filtermodel/filtermodel.component';
import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-contest',
  templateUrl: 'contest.page.html',
  styleUrls: ['contest.page.scss'],
})
export class ContestPage {
  GameID = '';
  GameName = '';
  GameType = '';
  GameStartTime:any = '';
  GameClosingTime:any = '';

  TotalFee:any =0;
  TotalSelected:any =0;

  ScripList=[];
  scripName='';

  upDownName='';
  Option=[];

  contestList=[];
  gameDetail:any;

  forcastvalue='';
  user: any;

  AllContest=false;


  dayslow='';
  dayshigh='';


  constructor(public tools: Tools, private route: ActivatedRoute,public modalController: ModalController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {
      this.user = this.apiService.getUserData();

    this.route.params
      .subscribe((params) => {
        console.log('params GameID=>', params.GameID);
        this.GameID = params.GameID;
      });

  }

  ionViewDidEnter() {
   this.ContestDetails();
  }

  onChangeState(scripName) {
    this.scripName = scripName.target.value;
    console.log("a>>",this.scripName);
    
    if(this.GameType == 'E'){
      this.Option=[];
      this.getOption(this.scripName);

    }
    console.log('Select scripName ' + this.scripName);
  }

  onChangeUpDownState(data) {
    this.upDownName = data.target.value;
    console.log('Select upDownName ' + this.upDownName);
  }

  getscrip() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.GetScrip().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        this.ScripList = res.data.Scrip;
        //this.ContestDetails();

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

  getOption(ScriptID) {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.GetOption(this.GameID,ScriptID).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        if(res.data?.Option){
          this.Option = res.data.Option;
        }else{
          this.Option=[];
          this.tools.openNotification(res.message)
        }

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

  ContestDetails() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.GameDetails(this.GameID).subscribe(data => {
        this.tools.closeLoader();
        this.getscrip();

        let res: any = data;
        console.log(' game > ', res);
     
        this.gameDetail = res.data.gameDetail[0];
        this.GameName= this.gameDetail.ContestName;
        this.GameType= this.gameDetail.ContestType;
        this.GameClosingTime= this.gameDetail.GameEndTime;
        this.GameStartTime= this.gameDetail.GameStartTime;

        this.contestList = res.data.contestFee;
        for (let index = 0; index < this.contestList.length; index++) {
          const element = this.contestList[index];
          this.contestList[index].isChecked=false
        }

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

  changeItem(item){
    console.log('items ',item)     
     console.log('isChecked ', this.contestList.filter(item=> item.isChecked).length)
      this.TotalSelected=this.contestList.filter(item=> item.isChecked).length;
      var chkAmt = 0;
      for (let k = 0; k < this.contestList.length; k++) {
        const element = this.contestList[k];
        if (element.isChecked) {
          chkAmt =chkAmt + parseFloat(element.GameAmt);
          console.log('chkAmt ',chkAmt) 
        }
      }
      this.TotalFee=chkAmt.toFixed(2);

  }

  isAllChecked(event) {
    console.log("Check Box >> ", event.target.checked);
    if(event.target.checked){
      var chkAmt = 0;
      for (let index = 0; index < this.contestList.length; index++) {
        const element = this.contestList[index];
        this.contestList[index].isChecked=true;
        chkAmt =chkAmt + parseFloat(element.GameAmt);
          console.log('chkAmt ',chkAmt) 
          this.TotalFee=chkAmt.toFixed(2);
      }

    }else{
      this.TotalFee=0;
      for (let index = 0; index < this.contestList.length; index++) {
        const element = this.contestList[index];
        this.contestList[index].isChecked=false;
      }
    }
}
  pay(){
    var msg = ''
    if (this.scripName == '') {
        msg = msg + 'Select Scrip<br/>'
      }
   
     if (this.GameType == 'E' && this.upDownName == '') {
      msg = msg + 'Select Up-Down Value<br/>'
    }
    if (this.GameType == 'T' &&this.forcastvalue == '') {
      msg = msg + 'Enter Forecast Value<br/>'
    }
    if (this.GameType == 'R' &&this.dayslow == '') {
      msg = msg + 'Enter Days Low Value<br/>'
    }
    if (this.GameType == 'R' &&this.dayshigh == '') {
      msg = msg + 'Enter Days High Value<br/>'
    }
    if(this.TotalFee == 0) {
      msg = msg + 'Select Atlist One Contest<br />'
   }
   
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      console.log("scripName >>",this.scripName)
      console.log("upDownName >>",this.upDownName)
      console.log("contestList >>",this.contestList)
      console.log("forcastvalue >>",this.forcastvalue)
      console.log("dayslow >>",this.dayslow)
      console.log("dayshigh >>",this.dayshigh)
      this.GameJoin();
    }
  }
    
  GameJoin() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("GameID", this.GameID);
      postData.append("ScriptID", this.scripName);
      postData.append("gameJoin", JSON.stringify(this.contestList));
      postData.append("Payment", this.TotalFee);

     // postData.append("SelectedAnswer", this.GameType == 'T'?this.forcastvalue:this.upDownName);

      if(this.GameType == 'T'){
        postData.append("SelectedAnswer",this.forcastvalue);
      }else if(this.GameType == 'E'){
        postData.append("SelectedAnswer",this.upDownName);
      }else if(this.GameType == 'R'){
        postData.append("SelectedAnswer",this.dayslow+" - "+this.dayshigh);
        postData.append("dayslow",this.dayslow);
        postData.append("dayshigh",this.dayshigh);
      }

      this.apiService.GameJoin(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        this.tools.openNotification(res.message)

        if(res.status)
        this.router.navigateByUrl('/home', { replaceUrl: true }); 

        
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

  async viewSelctedValue(GamePriceID){
    var msg = ''
    if (this.scripName == '') {
        msg = msg + 'Select Scrip<br/>'
      }
      
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      console.log("scripName >>",this.scripName)
      console.log("Game ID >>",this.GameID)
      console.log("GamePriceID >>",GamePriceID)
        const modal = await this.modalController.create({
          component: FilterModelComponent,
          cssClass: 'change-success-modal',
          componentProps: {ScriptID: this.scripName,GameID:this.GameID,GamePriceID:GamePriceID },

        });
        await modal.present();
        await modal.onDidDismiss()
          .then((data) => {
            console.log('Selected Cart Items from Dilogs ',data);
            if (data) {
              // this.getOrderData(data.data[0].SelStatus,data.data[1].SelOrderType,"",
              //   data.data[2].SelFromDate,data.data[3].SelToDate,data.data[4].SelSortBy);
            }
          });
      
    }
  }
 
}
