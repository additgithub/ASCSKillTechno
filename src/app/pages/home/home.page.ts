import { ApiService } from 'src/app/services/api.service-new';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MenuController } from "@ionic/angular";
import { Tools } from 'src/app/shared/tools';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;


  //For User
  MachineList = [];
  ALLMachineList = [];
  machineName = "";

  sumCart = 0;
  class_add = 'img carticon animate'
  cs_count = 'notification'


  constructor(private menu: MenuController, public tools: Tools,
    private router: Router, private apiService: ApiService) {
    this.user = this.apiService.getUserData();
   
  
  }

  ionViewDidEnter() {
 
  }

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  //Menu Click Event 

  Dashboard() {
    this.menu.close();
    this.router.navigateByUrl("home");
  }
  Profile() {
    this.menu.close();
    this.router.navigateByUrl("profile");
  }
  Wallet() {
    this.menu.close();
    this.router.navigateByUrl("wallet");
  }
  History() {
    this.menu.close();
    this.router.navigateByUrl("history");
  }
  Settings() {
    this.menu.close();
    this.router.navigateByUrl("settingscren");
  }
  howtoplay() {
    this.menu.close();
    this.router.navigateByUrl("howtoplay");
  }
  Reportissue() {
    this.menu.close();
    this.router.navigateByUrl("reportissue");
  }
  faq() {
    this.menu.close();
    this.router.navigateByUrl("faqs");
  }
  Helpcenter() {
    this.menu.close();
    this.router.navigateByUrl("helpcenter");
  }
  Aboutus() {
    this.menu.close();
    this.router.navigateByUrl("aboutus");
  }
  logout(isLogin) {
    this.menu.close();
    if (isLogin)
      this.tools.presentLogout(
        "Are you sure you want to logout?",
        "Logout",
        "Cancel"
      );
    else {
      this.menu.close();
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }



   // Api Calling

  getMachineList() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.sendOtp("").subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response ', res);
        this.MachineList = res.data.Machine;
        this.ALLMachineList = res.data.Machine;

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


  // For User Filter
  async ionChangeUser() {
    console.log("click >>", this.machineName)
    this.MachineList = await this.ALLMachineList;
    const searchTerm = this.machineName;
    if (!searchTerm) {
      return;
    }

    this.MachineList = this.MachineList.filter(currentDraw => {
      if (currentDraw.MachineName && searchTerm) {
        return ((currentDraw.MachineName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }
  

}
