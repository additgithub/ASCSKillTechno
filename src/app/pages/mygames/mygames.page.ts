import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-mygames',
  templateUrl: 'mygames.page.html',
  styleUrls: ['mygames.page.scss'],
})
export class MyGamesPage {

  myGameList = [];

  constructor(public tools: Tools,private activatedRoute: ActivatedRoute, 
     public formBuilder: FormBuilder,  private eventService:EventService,
     private apiService: ApiService, private router: Router) {


  }
  ionViewDidEnter() {
    this.getMyGame();
  }

  itemClick() {
    this.router.navigateByUrl('contest');
  }
  getMyGame() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.MyGameList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        this.myGameList = res.data.GameList;
      
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
