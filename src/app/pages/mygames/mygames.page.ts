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
  gameArrayList = [];

  constructor(public tools: Tools,private activatedRoute: ActivatedRoute, 
     public formBuilder: FormBuilder,  private eventService:EventService,
     private apiService: ApiService, private router: Router) {


  }
  ionViewDidEnter() {
    this.getMyGame();
  }

  gameDetails(GameID) {
    this.router.navigateByUrl('mygamedetails/' + GameID);
  }
  getMyGame() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.MyGameList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        //this.myGameList =[];
        this.gameArrayList=[];
        let date = '';
        this.myGameList = res.data.joinGameUser;

        this.myGameList.sort((a, b) => (a.GameDate > b.GameDate) ? 1 : -1)
        this.myGameList.forEach(element => {
          console.log("date>>>",date)
          console.log("elemrnt date>>>",element.GameDate)
          if(date == ''){
            console.log("if")
            date = element.GameDate;
            this.gameArrayList.push({'date':element.GameDate,'data':this.myGameList.filter((v) => (v.GameDate === element.GameDate))})
          }else if(date != element.GameDate){
            date = element.GameDate;
             if(this.gameArrayList.filter((j) => (j.date != date))){
               console.log("else In")
                this.gameArrayList.push({'date':element.GameDate,'data':this.myGameList.filter((l) => (l.GameDate === element.GameDate))})
             }
          }
          
        });
        console.log("this m array>>",this.gameArrayList)



      
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
