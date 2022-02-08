import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-upcominggames',
  templateUrl: 'upcominggames.page.html',
  styleUrls: ['upcominggames.page.scss'],
})
export class UpcomingGamesPage {

  InqList = [];

  constructor(public tools: Tools,private activatedRoute: ActivatedRoute, 
     public formBuilder: FormBuilder,  private eventService:EventService,
     private apiService: ApiService, private router: Router) {


  }
  ionViewDidEnter() {
  //  this.getMyInquiry();
  }

  GameDetails(GameID) {
    this.router.navigateByUrl('gameresultdetails/' + GameID);

  }
  getMyInquiry() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.MyInqList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        this.InqList = res.data.MyInquiry;
        

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
