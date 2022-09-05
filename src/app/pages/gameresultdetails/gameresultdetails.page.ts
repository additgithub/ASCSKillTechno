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
  GameUserID = '';
  // Selstatus:any = "LOST";

  user: any;
  
  GameHistory= [];
  GameHistoryUserDetail= [];
  gameDetail:any;

  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {
      this.user = this.apiService.getUserData();

    this.route.params
      .subscribe((params) => {
        console.log('params =>', params.GameID);
        this.GameUserID = params.GameID;
      });

  }
  ionViewDidEnter() {
    this.getGameResult();
  }

  getGameResult() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();

      postData.append('GameUserID', this.GameUserID);

      this.apiService.GetGameResult(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log('getGameResult > ', res);
        this.GameHistory = res.data.gameHistory;
        this.GameHistoryUserDetail = res.data.winerplayer;

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
