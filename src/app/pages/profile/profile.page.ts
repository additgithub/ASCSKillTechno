import { LoginPage } from './../../auth/login/login.page';
import { EventService } from '../../services/EventService';
import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ActionSheetController, PickerController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {

  loginForm: FormGroup;
  user: any;

  IsEdit=false;
  image1: any;

  getOTP=false;

  constructor(public pickerCtrl: PickerController, public tools: Tools, public formBuilder: FormBuilder, private eventService: EventService,
    private activatedRoute: ActivatedRoute,public actionSheetController: ActionSheetController, 
    private camera: Camera,
    private router: Router, public apiService: ApiService) {
    this.user = this.apiService.getUserData();

    console.log("image >>>",this.user.Image)
    this.loginForm = this.formBuilder.group({
  
      fname: [this.user.first_name, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lname: [this.user.last_name, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      mobile: [this.user.mobile_no, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      otp: ['', [Validators.required, Validators.maxLength(6),Validators.pattern('[0-9]+')]],

    });
  }
  ionViewDidEnter() {
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
        this.apiService.sendOtp(mobileNo).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          console.log("res >>",res)
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

  SaveProfile() {

    let fname = this.loginForm.get('fname').value;
    let lname = this.loginForm.get('lname').value;
    let mobile = this.loginForm.get('mobile').value;
    let otp = this.loginForm.get('otp').value;

    var msg = ''
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

    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        let postData = new FormData();

        postData.append('first_name', fname);
        postData.append('last_name', lname);
        postData.append('mobile_no', mobile);
        postData.append('Image',this.image1);
    
        this.tools.openLoader();
        this.apiService.SaveProfile(postData).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          console.log("prof >>>",res)
          this.apiService.setUserData(res.data.user, '');
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

  editProfile(){
    this.IsEdit=true;
  }
 
  isReadonly() {return true;}

  onFileChange(event, isEdit=false) {
    if (event.target.files && event.target.files.length > 0) {
      
      const file = event.target.files[0];
     // this.imageName=file.name;

      const fileSizeInKB = Math.round(file.size / 1024);
      if (fileSizeInKB >= 5012) {
          //this.toastr.error("Allow only 5 mb image size", "Error");
          return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      if(isEdit){
      //  this.isPostImageEdit = true;
        //this.PEditControl.post_image.setValue(file);
      }else{
        //this.isPostImageAdd = true;
        //this.control.post_image.setValue(file);
       this.image1=file;
        
      }
    }
  }

  async selectImage(type) {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          if (type == '1') {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          if (type == '1') {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log('User Image --> ', imageData);
      this.image1 = imageData;
    }, (err) => {
      console.log(err);
    });
  }
}
