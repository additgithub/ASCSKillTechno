import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
})
export class HistoryPage {
  user: any;

  GameHistory= [];
  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {
      this.user = this.apiService.getUserData();
  }

  ionViewDidEnter() {
   this.getGameHistory();
  }
  // onChangeState(agent) {
  //   this.Selstatus = agent;
  //   console.log('Select agent ' + agent);
  // }

  // getAdminInquiryDetail() {
  //   if (this.tools.isNetwork()) {
  //     let postData = new FormData();

  //     postData.append('InquiryHdrID', this.GameID);

  //     this.tools.openLoader();
  //     this.apiService.sendOtp(postData).subscribe(data => {
  //       this.tools.closeLoader();

  //       let res: any = data;
  //       console.log(' Response ', res);
  //       this.AdminInqDetails = res.data.InquiryDetail;

  //       this.InqNO = this.AdminInqDetails[0].InqNO
  //       this.InqDate = this.AdminInqDetails[0].InqDate
  //       this.Custname = this.AdminInqDetails[0].fullname
  //       this.Agentname = this.AdminInqDetails[0].agentname
  //       this.AlreadySelStatus = this.AdminInqDetails[0].Status
        
  //       this.Selstatus = this.AlreadySelStatus;
  //       console.log("Selstatus >>",this.Selstatus);
  //       console.log("AlreadySelStatus >>",this.AlreadySelStatus);

  //       if(this.AdminInqDetails[0].Status ==="Pending"){
  //         this.colors = 'yallowcolor'
  //       }
  //       if(this.AdminInqDetails[0].Status === "In Progress"){
  //         this.colors = 'orangecolor'
  //       }
  //       if(this.AdminInqDetails[0].Status ==="Completed"){
  //         this.colors = 'greencolor'
  //       }
  //       if(this.AdminInqDetails[0].Status ==="Cancelled"){
  //         this.colors = 'radcolor'
  //       }

  //     }, (error: Response) => {
  //       this.tools.closeLoader();
  //       console.log(error);

  //       let err: any = error;
  //       this.tools.openAlertToken(err.status, err.error.message);
  //     });

  //   } else {
  //     this.tools.closeLoader();
  //   }

  // }

  gameResult(GameID){
    this.router.navigateByUrl('gameresultdetails/' + GameID);
  }

  getGameHistory() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.GetGameHistory().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log('GetGameHistory > ', res);
        this.GameHistory = res.data.gameHistory;
      
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
}
