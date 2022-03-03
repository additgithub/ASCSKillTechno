import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-gameresultdetails',
  templateUrl: 'gameresultdetails.page.html',
  styleUrls: ['gameresultdetails.page.scss'],
})
export class GameResultDetailsPage {
  GameID = '';
  Selstatus:any = "LOST";

  user: any;
  
  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {
      this.user = this.apiService.getUserData();

    this.route.params
      .subscribe((params) => {
        console.log('params =>', params.GameID);
        this.GameID = params.GameID;
      });

  }
  ionViewDidEnter() {
    this.getGameResult();
  }

  getGameResult() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.GetGameHistory().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log('getGameResult > ', res);
       // this.GameHistory = res.data.gameHistory;
      
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
