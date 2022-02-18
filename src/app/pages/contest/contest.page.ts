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
  ContestID = '';
  ContestName = '';
  ContestType = '';
  TotalFee:any =0;
  TotalSelected:any =0;

  ScripList=[];
  scripName='';
  upDownName='';
  upDown=['UP','DOWN'];
  contestList=[];

  user: any;

  AllContest=false;

  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {
      this.user = this.apiService.getUserData();

    this.route.params
      .subscribe((params) => {
        console.log('params GameID=>', params.ContestID);
        console.log('params ContestName=>', params.ContestName);
        console.log('params ContestType=>', params.ContestType);
        this.ContestID = params.ContestID;
        this.ContestName = params.ContestName;
        this.ContestType = params.ContestType;
      });

  }
  ionViewDidEnter() {
   // this.getStatusList();
   this.getscrip();
  }
  onChangeState(scripName) {
    this.scripName = scripName.target.value;
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
        this.ContestDetails();

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
      this.apiService.ContestDetails(this.ContestID).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
     
        this.contestList = res.data.gameDetail;
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
          this.TotalFee=chkAmt.toFixed(2);
        }
      }
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
    
}
