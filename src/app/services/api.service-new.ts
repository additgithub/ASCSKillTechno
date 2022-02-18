import { AuthGuard } from './../shared/authguard.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Device } from '@ionic-native/device/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: "root",
})

export class ApiService {
  deviceInfo;
  bacisAuth;
  options;
  httpOptions: any;
  device_id = "";
  device_details = null;

  constructor(public auth: AuthGuard, private http: HttpClient, private device: Device,public oneSignal: OneSignal) {
     console.log('Device UUID is: ', this.device);
    this.deviceInfo = this.getDeviceInfo();
    this.device_id = this.device.uuid != null ? this.device.uuid : "1595831596879";
    console.log('device_id ', this.device_id);
    this.device_details = this.device.platform;


    this.bacisAuth = 'Basic ' + btoa(environment.username + ":" + environment.password);

    this.callOneSignal();
    this.setHeaderData();

  }

dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  setHeaderData() {
    console.log('Basic auth ' + this.bacisAuth)

    console.log('getLoginToken ', this.getLoginToken());
    console.log('getUserId ', this.getUserId());

    if (this.getLoginToken() == undefined) {
      this.httpOptions = {
        headers: new HttpHeaders({
         // 'Access-Control-Allow-Headers': "Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        //  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',

          'Access-Control-Allow-Origin': '*',
          'Authorization': this.bacisAuth,
          'ASCSKILL-API-KEY': environment.apikey,
        })
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          // 'Access-Control-Allow-Headers': "Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
          // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        //  'Accept': 'application/json',  For Raw data
        //  'Content-Type': 'application/json', For Raw data
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.bacisAuth,
          'ASCSKILL-API-KEY': environment.apikey,
          'User-Id': this.getUserId(),
          'ASCSKILL-LOGIN-TOKEN': this.getLoginToken(),

        })
      };

    }
  }
  setHeaderDataNative() {
    if (this.auth.canActivate && this.getLoginToken() && this.getUserId()) {
      console.log('User Info ', this.getLoginToken());
      console.log('User Info ', this.getUserId());
      this.httpOptions = {
        'ASCSKILL-API-KEY': environment.apikey,
        'Authorization': this.bacisAuth,
        'ASCSKILL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
        'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, Authorization, Origin'
      }
    }
  }

  sendOtp(mobileNo) {
    this.setHeaderData();

    let postData = new FormData();
    postData.append("mobile_no", mobileNo);

    postData.append("device_id", this.device_id);
    postData.append("device_details", this.device_details);
    postData.append("PlayerID", localStorage.getItem('PlearID'));


    return this.http.post(environment.BaseUrl + "auth/send_otp", postData, this.httpOptions);
  }
  sendRegisterOtp(mobileNo) {
    this.setHeaderData();

    let postData = new FormData();
    postData.append("mobile_no", mobileNo);

    postData.append("device_id", this.device_id);
    postData.append("device_details", this.device_details);
    postData.append("PlayerID", localStorage.getItem('PlearID'));


    return this.http.post(environment.BaseUrl + "auth/send_otp_register", postData, this.httpOptions);
  }

  verifyOtp(mobileNo,OTP) {
    this.setHeaderData();

    let postData = new FormData();
    postData.append("mobile_no", mobileNo);
    postData.append("otp", OTP);

    postData.append("device_id", this.device_id);
    postData.append("device_details", this.device_details);
    postData.append("player_id", localStorage.getItem('PlearID'));


    return this.http.post(environment.BaseUrl + "auth/verify_login_otp", postData, this.httpOptions);
  }

  Register(fname,lname,mobile) {
    this.setHeaderData();
    let postData = new FormData();
    postData.append("first_name", fname);
    postData.append("last_name", lname);
    postData.append("mobile_no", mobile);

    postData.append("device_id", this.device_id);
    postData.append("device_details", this.device_details);
    postData.append("player_id", localStorage.getItem('PlearID'));
    return this.http.post(environment.BaseUrl + "auth/customer_register", postData, this.httpOptions);
  }

  UpcomingGamesList(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'contest/contest_list', this.httpOptions);
  }
  MyGameList(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'game/myGame', this.httpOptions);
  }
  GetScrip(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'status/scripmaster_list', this.httpOptions);
  }
  ContestDetails(ContestID) {
    this.setHeaderData();

    let postData = new FormData();
    postData.append("ContestID", ContestID);

    postData.append("device_id", this.device_id);
    postData.append("device_details", this.device_details);
    postData.append("player_id", localStorage.getItem('PlearID'));


    return this.http.post(environment.BaseUrl + "game/gamedetail", postData, this.httpOptions);
  }
  // GET & SET USER DATA
 
  setUserData(userData, login_token) {
    console.log(userData)
    window.localStorage.setItem('killtechno_user_data', JSON.stringify(userData));
    if (login_token != '')
      window.localStorage.setItem('login_token', login_token);
    window.localStorage.setItem('user_id', userData.id);
  }

  getUserData() {
    if (window.localStorage['killtechno_user_data']) {
      return JSON.parse(window.localStorage['killtechno_user_data']);
    }
    return;
  }
 
  getUserId() {
    if (window.localStorage['user_id']) {
      return window.localStorage['user_id'];
    }
    return;
  }

  getLoginToken() {
    if (window.localStorage['login_token']) {
      return window.localStorage['login_token'];
    }
    return;
  }


  // GET & SET DEVICE INFO
  setDeviceInfo(deviceInfo) {
    window.localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo));
  }

  getDeviceInfo() {
    if (window.localStorage['deviceInfo']) {
      return JSON.parse(window.localStorage['deviceInfo']);
    }
    return;
  }

  callOneSignal() {
    this.oneSignal.startInit('9b0e84fb-5e5c-42dc-8582-84ef7c9e4c52','546015657170');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
     });
     
     this.oneSignal.handleNotificationOpened().subscribe(() => {
       // do something when a notification is opened
     });
  
    this.oneSignal.endInit();
    this.oneSignal.getIds().then((id) => {
      console.log('userId login ==> ',id.userId);
      console.log('pushToken ==> ',id.pushToken);
      localStorage.setItem('PlearID',id.userId);
    });
  }
}