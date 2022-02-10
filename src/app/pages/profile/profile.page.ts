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
  AgentList = [];
//  selectcategory:any;

IsEdit=false;
Selstatus = "";
image1: any;

  constructor(public pickerCtrl: PickerController, public tools: Tools, public formBuilder: FormBuilder, private eventService: EventService,
    private activatedRoute: ActivatedRoute,public actionSheetController: ActionSheetController, 
    private camera: Camera,
    private router: Router, public apiService: ApiService) {
    this.user = this.apiService.getUserData();

    //this.from = this.activatedRoute.snapshot.paramMap.get('from');
    this.loginForm = this.formBuilder.group({
      // fname: [this.user.first_name, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      // lname: [this.user.last_name, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      // compname: [this.user.company_name, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      // agent: [this.user.agentid, [Validators.required]],
      // mobile: [this.user.phone, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      // email: [this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      otp: ['', [Validators.required, Validators.maxLength(6),Validators.pattern('[0-9]+')]],

    });
  }
  ionViewDidEnter() {
  }

  login() {
    localStorage.setItem('isFirst', 'true');
    this.router.navigateByUrl('login');
  }
  SaveProfile() {

    console.log("calll >>>")
    let fname = this.loginForm.get('fname').value;
    let lname = this.loginForm.get('lname').value;
    let mobile = this.loginForm.get('mobile').value;
    let email = this.loginForm.get('email').value;
    let compname = this.loginForm.get('compname').value;
    let agent = this.loginForm.get('agent').value;

    var msg = ''
    if (fname == "") {
      msg = msg + "Enter your first name<br />";
    }
    if (lname == "") {
      msg = msg + "Enter your last name<br />";
    }
    if(this.user.roleid == 2){
      if (compname == "") {
        msg = msg + "Enter your comapany name<br />";
      }
    }
    if (this.loginForm.get("email").invalid) {
      if (email == "") {
        msg = msg + "Please enter email address<br />";
      } else {
        msg = msg + "Please enter a valid email address<br />";
      }
    }
    if (mobile == "" || mobile.length != 10) {
      msg = msg + "Please enter a valid mobile number<br />";
    }
    if(this.user.roleid == 2){
      if (agent == undefined || agent == "") {
        msg = msg + "Select Agent<br />";
      }
    }

    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        let postData = new FormData();

        postData.append('first_name', fname);
        postData.append('last_name', lname);
        postData.append('email', email);
        postData.append('phone', mobile);
        postData.append('roleid', this.user.roleid);
        if(this.user.roleid == 2){
          postData.append('company_name', compname);
          postData.append('agentid', agent);
        }
        this.tools.openLoader();
        this.apiService.SaveProfile(postData).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
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
  GetOTP(){
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
