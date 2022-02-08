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
  AgentList = [];


  constructor(public pickerCtrl: PickerController, public tools: Tools, public formBuilder: FormBuilder, private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService) {
    this.loginForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
     // compname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
     // agent: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      //email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      otp: ['', [Validators.required, Validators.maxLength(6),Validators.pattern('[0-9]+')]],

    });
  }
  ionViewDidEnter() {
  }


  login() {
    localStorage.setItem('isFirst', 'true');
    this.router.navigateByUrl('login');
  }
  GetOTP() {
  }

  register() {

    let fname = this.loginForm.get('fname').value;
    let lname = this.loginForm.get('lname').value;
    let mobile = this.loginForm.get('mobile').value;

    var msg = ''
    if (fname == "") {
      msg = msg + "Enter your first name<br />";
    }
    if (lname == "") {
      msg = msg + "Enter your last name<br />";
    }

    if (mobile == "" || mobile.length != 10) {
      msg = msg + "Please enter a valid mobile number<br />";
    }
  
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {

      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        this.apiService.login(fname,lname).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.loginForm.reset();
          this.router.navigateByUrl('otpverification/' + res.data.DefaultOTP + '/' + res.data.phone);


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
}
