import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-upcominggames',
  templateUrl: 'upcominggames.page.html',
  styleUrls: ['upcominggames.page.scss'],
})
export class UpcomingGamesPage {

  gameList = [];
  gameArrayList = [];

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

  GameDetails(GameID) {
    this.router.navigateByUrl('contest/' + GameID);
  }

  getupcomingGame() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.UpcomingGamesList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        this.gameArrayList=[];
        let date = '';
        this.gameList = res.data.GameList;
        this.gameList.sort((a, b) => (a.GameDate > b.GameDate) ? 1 : -1)
        this.gameList.forEach(element => {
          console.log("date>>>",date)
          console.log("elemrnt date>>>",element.GameDate)
          if(date == ''){
            console.log("if")
            date = element.GameDate;
            this.gameArrayList.push({'date':element.GameDate,'data':this.gameList.filter((v) => (v.GameDate === element.GameDate))})
          }else if(date != element.GameDate){
            date = element.GameDate;
             if(this.gameArrayList.filter((j) => (j.date != date))){
               console.log("else In")
                this.gameArrayList.push({'date':element.GameDate,'data':this.gameList.filter((l) => (l.GameDate === element.GameDate))})
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
 


  getmiliSecond(){
  var milliseconds = new Date().getTime();  
  var _today_date = milliseconds;    
  console.log("milliseconds >",milliseconds);

  var myDate = new Date('2022-02-28 08:45:15');
  var result = myDate.getTime();
  var _schedule_date =result;
  console.log("milliseconds 2 >",result);

//  this.initTimer(_schedule_date);
//   this.startTimer();
  if(_schedule_date < _today_date){
    console.log("small")
  //  alert("Your Plan Is Expired,You have to upgrade your plan");
    //this.OpenExpiredAlert("");
  }
  else if(_schedule_date > _today_date){
    console.log("big")
  }
  else {
    console.log("same")
  }
 }

 expireIn() {
  // let startDt = new Date();
  // let endDt = new Date(deals.to_date);
  // var start = moment().format('yyyy-MM-dd');
  // var end = moment(deals.to_date).format('yyyy-MM-dd');
  var start = moment();
  var end = moment('2022-03-01 08:45:15');
  var difDay = end.diff(start, "days")
  var difhours = end.diff(start, "hours")
  var difminute = end.diff(start, "minute")

  console.log('Date Difference ', difDay);
  console.log('difhours Difference ', difhours);
  console.log('difhours Difference ', difminute);
  // return "Expires In " +Math.ceil(((endDt.getTime() - startDt.getTime())/ (24 * 3600 * 1000)))+" Days";
  return "Expires In " + end.diff(start, "days")+" Days";
}

 getdays(){
  var dateFuture:any = new Date(new Date().getFullYear() +1, 0, 1);
  var dateNow:any = new Date();
  
  var seconds = Math.floor((dateFuture - (dateNow))/1000);
  var minutes = Math.floor(seconds/60);
  var hours = Math.floor(minutes/60);
  var days = Math.floor(hours/24);
  
  hours = hours-(days*24);
  minutes = minutes-(days*24*60)-(hours*60);
  seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

  console.log("days >",days);
  console.log("hours >",hours);
  console.log("Minute >",minutes);
  console.log("Second >",seconds);
 

  // get total seconds between the times
var delta = Math.abs(dateFuture - dateNow) / 1000;

// calculate (and subtract) whole days
var days = Math.floor(delta / 86400);
delta -= days * 86400;

// calculate (and subtract) whole hours
var hours = Math.floor(delta / 3600) % 24;
delta -= hours * 3600;

// calculate (and subtract) whole minutes
var minutes = Math.floor(delta / 60) % 60;
delta -= minutes * 60;

// what's left is seconds
var seconds = delta % 60;  // in theory the modulus is not required
 }
}
