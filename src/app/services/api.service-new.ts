import { AuthGuard } from './../shared/authguard.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Device } from '@ionic-native/device/ngx';

@Injectable({
  providedIn: "root",
})

export class ApiService {
  deviceInfo;
  bacisAuth;
  options;
  httpOptions: any;
  device_id = "";

  constructor(public auth: AuthGuard, private http: HttpClient, private device: Device) {
    this.deviceInfo = this.getDeviceInfo();
    this.device_id = this.device.uuid != null ? this.device.uuid : "123456";
    console.log('device_id ', this.device_id);

    this.bacisAuth = 'Basic ' + btoa(environment.username + ":" + environment.password);

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
          'KUSHAL-API-KEY': environment.apikey,
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
          'KUSHAL-API-KEY': environment.apikey,
          'User-Id': this.getUserId(),
          'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),

        })
      };

    }
  }
  setHeaderDataNative() {
    if (this.auth.canActivate && this.getLoginToken() && this.getUserId()) {
      console.log('User Info ', this.getLoginToken());
      console.log('User Info ', this.getUserId());
      this.httpOptions = {
        'KUSHAL-API-KEY': environment.apikey,
        'Authorization': this.bacisAuth,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
        'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, Authorization, Origin'
      }
    }
  }

  sendOtp(mno): any {

    var dID;
    if (!localStorage.getItem('PlearID')) {
      dID = localStorage.getItem('PlearID') == '' ? "111111" : localStorage.getItem('PlearID');
    } else {
      dID = '111111'
    }

    var httpOptions = {
      headers: new HttpHeaders({
         // 'Access-Control-Allow-Headers': "Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
          // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
      })
    }

    let postData = new FormData();
    postData.append("mobile_no", mno);
    postData.append("player_id", dID);
    postData.append("device_token", this.device_id);
    return this.http.post(environment.BaseUrl + 'auth/send_otp', postData, httpOptions);
  }

  confirmopt(otp,mno): any {

    var dID;
    if (!localStorage.getItem('PlearID')) {
      dID = localStorage.getItem('PlearID') == '' ? "111111" : localStorage.getItem('PlearID');
    } else {
      dID = '111111'
    }

    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
      })
    }

    let postData = new FormData();
    postData.append("mobile_no", mno);
    postData.append("otp", otp);
    postData.append("device_token", this.device_id);
    postData.append("player_id", dID);
    return this.http.post(environment.BaseUrl + 'auth/verify_login_otp', postData, httpOptions);
  }

  CustomerRegister(fname,lname,compname,email,mobile,agent): any {

    var dID;
    if (!localStorage.getItem('PlearID')) {
      dID = localStorage.getItem('PlearID') == '' ? "111111" : localStorage.getItem('PlearID');
    } else {
      dID = '111111'
    }

    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
      })
    }

    let postData = new FormData();
    postData.append("first_name", fname);
    postData.append("last_name", lname);
    postData.append("company_name", compname);
    postData.append("email", email);
    postData.append("phone", mobile);
    postData.append("agentid", agent);
    postData.append("device_token", this.device_id);
    postData.append("player_id", dID);
    postData.append("roleid", "2");
    return this.http.post(environment.BaseUrl + 'auth/customer_register', postData, httpOptions);
  }
  AddUser(fname,lname,compname,email,mobile,agent): any {

    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
      })
    }

    let postData = new FormData();
    postData.append("first_name", fname);
    postData.append("last_name", lname);
    postData.append("company_name", compname);
    postData.append("email", email);
    postData.append("phone", mobile);
    postData.append("agentid", agent);
    postData.append("device_token",'');
    postData.append("player_id", "");
    postData.append("roleid", "3");
    return this.http.post(environment.BaseUrl + 'auth/customer_register', postData, httpOptions);
  }

  AdminInqList(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'dashboard', this.httpOptions);
  }
  AgentInqList(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'agent/agentinquiryfor', this.httpOptions);
  }
 
  AgentList(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'agent/agent_list', this.httpOptions);
  }
  MyInqList(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'Inquiry', this.httpOptions);
  }
  MachineList(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'machine', this.httpOptions);
  }
  getStatus(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'status', this.httpOptions);
  }
  AddCartDetails(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'inquiry/cart_checkout', Data, this.httpOptions);
  }
  getMachinePdfList(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'machine/machine_pdf', Data, this.httpOptions);
  }
  AdminInqDetail(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'dashboard', Data, this.httpOptions);
  }

  MachinePartsList(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'machine/machinepart_list', Data, this.httpOptions);
  }
  
  deletepart(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'machine/remove_machineparts', Data, this.httpOptions);
  }
  deleteMachine(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'machine/remove_machine', Data, this.httpOptions);
  }
  deleteAgent(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'agent/remove_agent', Data, this.httpOptions);
  }

  AddAgent(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'agent', Data, this.httpOptions);
  }
  AddMachine(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'machine', Data, this.httpOptions);
  }
  EditMachine(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'machine/edit_machine', Data, this.httpOptions);
  }
  EditSaveAgent(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'agent/edit_agent', Data, this.httpOptions);
  }
  SaveProfile(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'auth/edit_profile', Data, this.httpOptions);
  }
  AddPart(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'machine/machinepart', Data, this.httpOptions);
  }
  EditPart(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'machine/edit_machinepart', Data, this.httpOptions);
  }

  ChangeStatus(Data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'status', Data, this.httpOptions);
  }











  login(email, password): any {

    var dID;
    if (!localStorage.getItem('PlearID')) {
      dID = localStorage.getItem('PlearID') == '' ? "111111" : localStorage.getItem('PlearID');
    } else {
      dID = '111111'
    }

    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
      })
    }

    let postData = new FormData();
    // postData.append('file', imageFile);
    postData.append("EmailID", email);
    postData.append("Password", password);
    postData.append("DeviceID", dID);
    return this.http.post(environment.BaseUrl + 'login', postData, httpOptions);
  }
  forgotPassword(email): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
      })
    }
    let postData = new FormData();
    // postData.append('file', imageFile);
    postData.append("email", email);
    return this.http.post(environment.BaseUrl + 'Register/forgot_password', postData, httpOptions);
  }
  changePassword(old, newp): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'KUSHAL-API-KEY': environment.apikey,
        'User-Id': this.getUserId(),
      })
    }
    let postData = new FormData();
    // postData.append('file', imageFile);
    postData.append("old_password", old);
    postData.append("new_password", newp);
    return this.http.post(environment.BaseUrl + 'Register/change_password', postData, httpOptions);
  }

  register(user, data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,

      })
    }
    return this.http.post(environment.BaseUrl + 'register', data, httpOptions);
  }
  editProfile(data, file: any): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),

      })
    }
    return this.http.post(environment.BaseUrl + 'register/edit_profile', data, httpOptions);
  }
  countryList(): any {
    this.setHeaderData();
    let postData = new FormData();
    return this.http.post(environment.BaseUrl + 'Dashboard', postData, this.httpOptions);
  }





  payPass(data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
      })
    }
    return this.http.post(environment.BaseUrl + 'pay', data, httpOptions);
  }
  paypalVerifyMobile(data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),

      })
    }

    return this.http.post(environment.BaseUrl + 'PaypalVerifyMobile', data, httpOptions);
  }

  PaypalVerifyLuggage(data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
      })
    }
    return this.http.post(environment.BaseUrl + 'PaypalVerifyLuggage', data, httpOptions);
  }

  bookNow(data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),

      })
    }

    return this.http.post(environment.BaseUrl + 'BookNow', data, httpOptions);
  }
  bookedPass(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'user-pass-list', this.httpOptions);
  }
  bookedbaglist(PassID): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'User_pass_list/pass_detail?PassID='+PassID, this.httpOptions);
  }
  Emergency(): any {
    return this.http.post(environment.BaseUrl + 'Emergency', {}, this.httpOptions);
  }
  passList(CountryID): any {
    return this.http.post(environment.BaseUrl + 'PassList', { 'CountryID': CountryID }, this.httpOptions);
  }

  SuppportSendMassage(data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
      })
    }
    return this.http.post(environment.BaseUrl + 'SupportChat', data, httpOptions);
  }
  GetGroupMemberList(data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
      })
    }
    return this.http.post(environment.BaseUrl + 'Groupchat/group_member_list', data, httpOptions);
  }
  DeleteMember(data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
      })
    }
    return this.http.post(environment.BaseUrl + 'Groupchat/left_group', data, httpOptions);
  }
  
  GetBagPass(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'luggage-bag-list', this.httpOptions);
  }
  getsupportchat(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'SupportChat/chat', this.httpOptions);
  }
  
  getuserchatlist(): any {
    this.setHeaderData();
    console.log('User list');
    return this.http.get(environment.BaseUrl + 'UserChatList', this.httpOptions);
  }
  getgrouplist(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'Groupchat', this.httpOptions);
  }

 
  CreateNewGroup(data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
      })
    }
    return this.http.post(environment.BaseUrl + 'Groupchat/create_group', data, httpOptions);
  }
  
  AddMemberToGroup(data): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.bacisAuth,
        'KUSHAL-API-KEY': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
      })
    }
    return this.http.post(environment.BaseUrl + 'Groupchat/add_group_member', data, httpOptions);
  }
  
  
  getRideHistory(): any {
    this.setHeaderData();
    return this.http.get(environment.BaseUrl + 'MyRideList', this.httpOptions);
  }


  getUserInfo(): any {
    this.setHeaderData();
    let postData = new FormData();
    return this.http.post(environment.BaseUrl + 'UserInfo', postData, this.httpOptions);
  }



  rideRatingPost(data): any {
    this.setHeaderData();
    return this.http.post(environment.BaseUrl + 'MyRideList/ratting_ride', data, this.httpOptions);
  }
  getCurrentLatLng() {
    navigator.geolocation.getCurrentPosition((res) => {
      let currentLatLng: any = {};
      currentLatLng.latitude = res.coords.latitude;
      currentLatLng.longitude = res.coords.longitude;
      return currentLatLng;
    });
  }

  // GET & SET USER DATA
  setSelPass(bookedPass) {
    console.log(bookedPass)
    window.localStorage.setItem('bookedPass', JSON.stringify(bookedPass));
  }
  getEPass() {
    if (window.localStorage['ePass']) {
      return JSON.parse(window.localStorage['ePass']);
    }
    return;
  }
  // GET & SET USER DATA
  setEPass(ePass) {
    console.log(ePass)
    window.localStorage.setItem('ePass', JSON.stringify(ePass));
  }
  getSelPass() {
    if (window.localStorage['bookedPass']) {
      return JSON.parse(window.localStorage['bookedPass']);
    }
    return;
  }
  setSelRide(selectedRide) {
    console.log(selectedRide)
    window.localStorage.setItem('seleRide', JSON.stringify(selectedRide));
  }
  getSelRide() {
    if (window.localStorage['seleRide']) {
      return JSON.parse(window.localStorage['seleRide']);
    }
    return;
  }
  setUserData(userData, login_token) {
    console.log(userData)
    window.localStorage.setItem('kushal_user_data', JSON.stringify(userData));
    if (login_token != '')
      window.localStorage.setItem('login_token', login_token);
    window.localStorage.setItem('user_id', userData.id);
  }
  setSelectedCountry(item) {
    window.localStorage.setItem('sel_route', JSON.stringify(item));
  }

  getSelectedCountry() {
    if (window.localStorage['sel_route']) {
      return JSON.parse(window.localStorage['sel_route']);
    }
    return;
  }
  setSelectedRoute(item) {
    window.localStorage.setItem('sel_route_sub', JSON.stringify(item));
  }
  getSelectedRoute() {
    if (window.localStorage['sel_route_sub']) {
      return JSON.parse(window.localStorage['sel_route_sub']);
    }
    return;
  }
  setSelectedPass(item) {
    if (item != null)
      window.localStorage.setItem('selPass', JSON.stringify(item));
    else
      window.localStorage.setItem('selPass', '');
  }
  getSelectedPass() {
    if (window.localStorage['selPass']) {
      return JSON.parse(window.localStorage['selPass']);
    }
    return;
  }
  getUserData() {
    if (window.localStorage['kushal_user_data']) {
      return JSON.parse(window.localStorage['kushal_user_data']);
    }
    return;
  }
  getCartData() {
    if (window.localStorage['kushal_cart_data']) {
      return JSON.parse(window.localStorage['kushal_cart_data']);
    }
    return;
  }
  setCartData(cartData) {
    console.log(cartData)
    window.localStorage.setItem('kushal_cart_data', JSON.stringify(cartData));
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
}