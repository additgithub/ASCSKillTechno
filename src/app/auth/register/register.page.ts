import { EventService } from './../../services/EventService';
import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {

  loginForm: FormGroup;
  getOTP=false;

  ResOTP:any;
  DefaultOTP:any;

  RefrenceList = [];

  constructor(public pickerCtrl: PickerController, public tools: Tools, public formBuilder: FormBuilder, private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService) {
    this.loginForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      otp: ['', [Validators.required, Validators.maxLength(6),Validators.pattern('[0-9]+')]],
      refid: ['', [Validators.required]],

    });
  }
  ionViewDidEnter() {
    this.getRefrenceList();
  }


  login() {
    localStorage.setItem('isFirst', 'true');
    this.router.navigateByUrl('login');
  }

  GetOTP() {
    let mobileNo = this.loginForm.get('mobile').value;

    var msg = ''

    if (this.loginForm.get('mobile').invalid) {
      if (mobileNo == '') {
        msg = msg + 'Enter your mobile No.<br />'
      } else {
        msg = msg + 'Please enter a valid mobile No.<br />'
      }
    }
   
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        this.apiService.sendRegisterOtp(mobileNo).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          console.log("res >>",res)
          this.ResOTP=res.data.otp
          this.DefaultOTP=res.data.DefaultOTP
          this.getOTP=true;
          this.tools.openNotification(res.message)
        }, (error: Response) => {
          let err: any = error;        
          console.log('Api Error ', err);

          this.tools.closeLoader();
          this.tools.openAlertToken(err.status, err.error.message);
          console.log('Api Error >>>> ', err.error.message);

        });
      } else {
        this.tools.closeLoader();
      }
    }
  }

  register() {

    let fname = this.loginForm.get('fname').value;
    let lname = this.loginForm.get('lname').value;
    let mobile = this.loginForm.get('mobile').value;
    let otp = this.loginForm.get('otp').value;
    let refid = this.loginForm.get('refid').value;

    var msg = ''
    if (fname == "") {
      msg = msg + "Enter your first name<br />";
    }
    if (lname == "") {
      msg = msg + "Enter your last name<br />";
    }

    if (this.loginForm.get('mobile').invalid) {
      if (mobile == '') {
        msg = msg + 'Enter your mobile No.<br />'
      } else {
        msg = msg + 'Please enter a valid mobile No.<br />'
      }
    } 
    if (refid == "") {
      msg = msg + "Select Reference By<br />";
    }

    console.log("Res OTP",this.ResOTP)
    console.log("Res OTP",otp)

    if ( otp != this.DefaultOTP && otp != this.ResOTP) {
      msg = msg + "Enter Valid OTP<br />";
    }

    if (msg != '') {
      this.tools.openAlert(msg);
    } else {

      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        this.apiService.Register(fname,lname,mobile,refid).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.loginForm.reset();
          localStorage.setItem('login_token', res.login_token);
          this.apiService.setUserData(res.data.user, res.login_token);
          this.router.navigateByUrl('/home', { replaceUrl: true }); 
        }, (error: Response) => {
          this.tools.closeLoader();
          let err: any = error;
          console.log('Api Error ', err);
        });
      } else {
        this.tools.closeLoader();
      }
    }
  }

  getRefrenceList() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.GetReferenceList().subscribe(data => {
        this.tools.closeLoader();
        let res: any = data;
        console.log(' reference > ', res);
        this.RefrenceList = res.data.reference;

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
