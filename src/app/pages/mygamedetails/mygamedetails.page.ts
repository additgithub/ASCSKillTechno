import { FilterModelComponent } from './../../model/filtermodel/filtermodel.component';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-mygamedetails',
  templateUrl: 'mygamedetails.page.html',
  styleUrls: ['mygamedetails.page.scss'],
})
export class MyGameDetailsPage {
  GameID = '';
  GameName = '';
  GameType = '';

  //SelectedAnswer = '';

  GameStartTime:any = '';
  GameClosingTime:any = '';

  TotalFee:any =0;
  TotalSelected:any =0;

  upDownName:any;
  Option=[];

  contestList=[];
  gameDetail:any;

  forcastvalue='';
  user: any;

  AllContest=false;

  isEdit=false;

  isHideEdit=false;
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

  onChangeUpDownState(data) {
    this.upDownName = data.target.value;
    console.log('Select upDownName ' + this.upDownName);
  }

  ContestDetails() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.MyGameDetails(this.GameID).subscribe(data => {
        this.tools.closeLoader();
      //  this.getscrip();

        let res: any = data;
        console.log('Mygame > ', res);
     
         this.gameDetail = res.data.gameDetail[0];
         this.GameName= this.gameDetail.ContestName;
         this.GameType= this.gameDetail.ContestType;
         this.GameStartTime= this.gameDetail.GameStartTime;
         this.GameClosingTime= this.gameDetail.GameEndTime;

        this.contestList = res.data.contestFee;

       // 2022-02-28 08:45:15    2022-03-10 09:15:00
       this.getmiliSecond((this.gameDetail.GameDate)+" "+( this.GameClosingTime)+":00")

     

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

  Save(){
    for (let index = 0; index < this.contestList.length; index++) {
      const element = this.contestList[index];

      if(this.GameType !='R'){
        if(element.SelectedAnswer == "" || element.SelectedAnswer == 0){
          this.tools.openNotification("Enter Value For "+"contest Fee Rs "+element.GameAmt)
          break
        }else{
          console.log("this.contestList",JSON.stringify(this.contestList))
          this.GameEdit();
          break
        }
      }else if(this.GameType =='R') {
        
        if(element.dayslow == "" || element.dayshigh == ""){
          this.tools.openNotification("Enter Value For "+"contest Fee Rs "+element.GameAmt)
          break
        }else{
          console.log("this.contestList",JSON.stringify(this.contestList))
          element.SelectedAnswer = element.dayslow+" - "+ element.dayshigh
          this.GameEdit();
          break
        }
      }
    }
  }
    
  GameEdit() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("GameID", this.GameID);
      postData.append("gameedit", JSON.stringify(this.contestList));

      this.apiService.MyGameEdit(postData).subscribe(data => {
        this.tools.closeLoader();
        let res: any = data;
        console.log(' agent > ', res);
        if(res.status){
          this.router.navigateByUrl('/home', { replaceUrl: true }); 
        }
       
        this.tools.openNotification(res.message)

        
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

  editContest(value){
    this.isEdit=value;
  }

  async viewSelctedValue(GamePriceID,ScriptID){
   
      console.log("ScriptID >>",ScriptID)
      console.log("Game ID >>",this.GameID)
      console.log("GamePriceID >>",GamePriceID)
        const modal = await this.modalController.create({
          component: FilterModelComponent,
          cssClass: 'change-success-modal',
          componentProps: {ScriptID: ScriptID,GameID:this.GameID,GamePriceID:GamePriceID },

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

  getmiliSecond(date){
    var milliseconds = new Date().getTime();  
    var _today_date = milliseconds;    
    console.log("milliseconds _today_date>",milliseconds);
  
    var myDate = new Date(date);
    var result = myDate.getTime();
    var _schedule_date =result-900000;
    console.log("milliseconds comp_date >",_schedule_date);

    if(_schedule_date < _today_date){
      console.log("small")
      this.isHideEdit=true;
    }
    else if(_schedule_date > _today_date){
      console.log("big")
      this.isHideEdit=false;
    }
    else {
      console.log("same")
      this.isHideEdit=false;
    }
   }
}
