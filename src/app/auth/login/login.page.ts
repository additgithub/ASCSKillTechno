import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
   loginForm: FormGroup;

  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder,  private eventService:EventService,
    private apiService: ApiService, private router: Router) {

   // this.from = this.activatedRoute.snapshot.paramMap.get('from');
 
    this.loginForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.maxLength(10),Validators.pattern('[0-9]+')]],
      otp: ['', [Validators.required, Validators.maxLength(6),Validators.pattern('[0-9]+')]],

    });
  }

  register() {
    this.router.navigateByUrl('register');
  }
  GetOTP() {
    this.router.navigateByUrl('register');
  }

  login() {
    let mobile = this.loginForm.get('mobile').value;

    var msg = ''

    if (this.loginForm.get('mobile').invalid) {
      if (mobile == '') {
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
        this.apiService.sendOtp(mobile).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.loginForm.reset();
        this.router.navigateByUrl('otpverification/' + res.data.DefaultOTP + '/' + res.data.phone);
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

}
