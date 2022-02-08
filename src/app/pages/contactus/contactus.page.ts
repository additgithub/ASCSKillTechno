import { EventService } from '../../services/EventService';
import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-contactus',
  templateUrl: 'contactus.page.html',
  styleUrls: ['contactus.page.scss'],
})
export class ContactUsPage {

  loginForm: FormGroup;
  terms=false;
  from: any;


  constructor(public pickerCtrl: PickerController,public tools:Tools,public formBuilder: FormBuilder,  private eventService:EventService,private activatedRoute: ActivatedRoute,private router: Router,public apiService:ApiService) {
  this.from = this.activatedRoute.snapshot.paramMap.get('from');
    this.loginForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lname: ['', [Validators.required,Validators.pattern('[a-zA-Z]+')]],
      agent: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10),Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
 
    });
  }

  ionViewWillLeave(){
    this.pickerCtrl.dismiss();
  }


  onChangeState(country) {
    console.log('Select Country ' + country);
  }

  login(){
    localStorage.setItem('isFirst','true');
    this.router.navigateByUrl('login');
  }

  register(){

    let fname = this.loginForm.get('fname').value;
    let lname = this.loginForm.get('lname').value;
    let mobile = this.loginForm.get('mobile').value;
    let country = this.loginForm.get('country').value;
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;
    let cpassword = this.loginForm.get('cpassword').value;

    var msg = ''
    if (this.loginForm.get("fname").invalid) {
      // if (fname == "") {
      //   msg = msg + "Enter your first name<br />";
      // } else {
      //   msg = msg + "Please enter a valid first name<br />";
      // }
      msg = msg + "Enter your first name<br />";
    }
    // if (this.loginForm.get('lname').invalid) {
    if (lname == "") {
      msg = msg + "Enter your last name<br />";
    }
    if (country == undefined || country == "") {
      msg = msg + "Select country code<br />";
    }
    if (mobile == "" || mobile.length != 10) {
      msg = msg + "Please enter a valid mobile number<br />";
    }
    if (this.loginForm.get("email").invalid) {
      if (email == "") {
        msg = msg + "Please enter email address<br />";
      } else {
        msg = msg + "Please enter a valid email address<br />";
      }
    }
    if (this.loginForm.get("password").invalid) {
      if (password == "") {
        msg = msg + "Please enter Password<br />";
      } else {
        msg = msg + "Password length should be 8 characters or above<br />";
      }
    }
    if (this.loginForm.get("cpassword").invalid) {
      if (password == "") {
        msg = msg + "Please enter Confirm Password<br />";
      } else {
        msg = msg + "Confirm Password length should be 8 characters or above<br />";
      }
    }
   
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if(password != cpassword){
        this.tools.openAlert('"Password" and "Confirm Password" do not match');
      }else{   
        if (this.terms) {
          if (this.tools.isNetwork()) {
            this.tools.openLoader();
            this.apiService.register(fname,lname).subscribe(response => {
              this.tools.closeLoader();
              let res:any =  response;
              // console.log('// Api Response ',res);
              
              if (res.code == 1) {

                console.log('email_varification',res.details.verification_step);
            
                if(res.details.verification_step=="email_verification"){
                  this.router.navigateByUrl('emailverification'+'/'+email+'/'+this.from);
                }else{
                  localStorage.setItem('isFirst','true')
                  localStorage.setItem('cui-data', JSON.stringify(res.details));
                  this.eventService.publishFormRefresh(true);
                  if(this.from != 'cart'){
                    //setTimeout(() => {
                      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
                    //}, 4000);
                    }else{
                    this.router.navigateByUrl('/checkout-address/cart', { replaceUrl: true });
                  }
                }
                
              } else if (res.code == 2) {
                this.tools.presentAlert('', res.msg);
              }
    
            }, (error: Response) => {
              this.tools.closeLoader();
              let err:any =  error;
              // console.log('Api Error ',err.error);
              // let msg = err.error.text.replace('(','').replace(')','');
              // this.tools.presentAlert('',JSON.parse(msg).msg);
              console.log('Api Error ',err);
        
            });
          }else{
            this.tools.closeLoader();
          }
        }else {
          this.tools.openAlert('You must agree to "Terms and Conditions" before proceeding');
        }
      
    }
    }

   
  }

  onlyAlpha(event: any) {
    const pattern = /[a-zA-Z]+/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
