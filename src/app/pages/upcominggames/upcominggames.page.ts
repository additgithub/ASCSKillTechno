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

  gameList = [];
  displayTime:any;
  hasFinished:any;
  remainingTime:any;
  time:any;
  runTimer:any
  timeInSeconds:any;
  hasStarted:any;
  constructor(public tools: Tools,private activatedRoute: ActivatedRoute, 
     public formBuilder: FormBuilder,  private eventService:EventService,
     private apiService: ApiService, private router: Router) {


  }
  ionViewDidEnter() {
   this.getupcomingGame();
  }

  GameDetails(ContestID,ContestName,ContestType) {
    //this.router.navigateByUrl('gameresultdetails/' + GameID);
    this.router.navigateByUrl('contest/' + ContestID +'/'+ ContestName+'/'+ ContestType);
  }
  getupcomingGame() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.UpcomingGamesList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        this.gameList = res.data.Contest;
      
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


  initTimer(time) {
    // Pomodoro is usually for 25 minutes
    this.startTimer();

  this.timeInSeconds = time; 
   this.time = this.timeInSeconds;
   this.runTimer = false;
   this.hasStarted = false;
   this.hasFinished = false;
   this.remainingTime = this.timeInSeconds;
   
   this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
 }
 
 startTimer() {
    this.runTimer = true;
   this.hasStarted = true;
   this.timerTick();
 }
 
 
 
 timerTick() {
   setTimeout(() => {
 
     if (!this.runTimer) { return; }
     this.remainingTime--;
     this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
     if (this.remainingTime > 0) {
       this.timerTick();
     }
     else {
       this.hasFinished = true;
     }
   }, 1000);
 }
 
 getSecondsAsDigitalClock(inputSeconds: number) {
   var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
   var hours = Math.floor(sec_num / 3600);
   var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
   var seconds = sec_num - (hours * 3600) - (minutes * 60);
   var hoursString = '';
   var minutesString = '';
   var secondsString = '';
   hoursString = (hours < 10) ? "0" + hours : hours.toString();
   minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
   secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
   return hoursString + ':' + minutesString + ':' + secondsString;
 }
 
}
