import { ActionSheetController, AlertController, MenuController, NavController, PickerController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonRouterOutlet, ModalController, Platform, ToastController } from '@ionic/angular';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor( private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
     private oneSignal: OneSignal,
     private menu: MenuController,
     public pickerCtrl: PickerController,
     public alert:AlertController,
     private navCtrl: NavController,
     private actionSheetCtrl: ActionSheetController,
     private popoverCtrl: PopoverController,

    private toast: ToastController,
    public modalCtrl: ModalController,
) {

    this.initializeApp();
    this.backButtonEvent();
  }

 
  callOneSignal() {
    this.oneSignal.startInit('4f0eae29-30e6-4ab7-ae8e-6b0b0ff48b53','401339524363');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
     });
     
     this.oneSignal.handleNotificationOpened().subscribe(() => {
       // do something when a notification is opened
     });
     
 
    
    this.oneSignal.endInit();
    this.oneSignal.getIds().then((id) => {
      console.log('userId ==> ',id.userId);
      console.log('pushToken ==> ',id.pushToken);
      localStorage.setItem('OSPlayerID',id.userId);
      
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false); 
      this.statusBar.show();
      this.splashScreen.hide();
      this.callOneSignal();
    });
  }
 
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(999999, async () => {
    console.log('subscribeWithPriority Route URL ', this.router.url);


       //clode picker
       try {
        const element = await this.pickerCtrl.getTop();
        if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {
        }

       // close alert
       try {
        const element = await this.alert.getTop();
        if (element) {
            element.dismiss();
            return;
            }
          } catch (error) {

          }

          //Close action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          console.log('Action Sheet');
          element.dismiss();
          return;
        }
      } catch (error) {
      }
  
      // close popover
      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          console.log('Popver');
          element.dismiss();
          return;
        }
      } catch (error) {
      }
  
      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          console.log('Model');
          element.dismiss();
          return;
        }
      } catch (error) {
        
  
      }
  
      // close side menua
      try {
        const element = await this.menu.isOpen();
        console.log('Menu ',element);
        if (element) {
            this.menu.close();
            return;
        }
      } catch (error) {
      }

      // navigator['app'].exitApp();
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (this.router.url === '/home') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            navigator['app'].exitApp(); // work in ionic 4
          } else {
            this.presentToast('Press back again to exit App.');
            this.lastTimeBackPress = new Date().getTime();
          }
         }// else if (this.router.url === '/route-details') {
        //   outlet.pop();
        //  else if (this.router.url === '/orderhistory') {
        //   if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
        //     this.navCtrl.back();
        //   } else {
        //     this.lastTimeBackPress = new Date().getTime();
        //   }
        // }
        else if (this.router.url === '/login') {
          navigator['app'].exitApp(); // work in ionic 4
        }
        else if (outlet && outlet.canGoBack()) {
          outlet.pop();
        }
      });
    });
    this.platform.backButton.subscribe(async () => {
      console.log('subscribe Route ', this.router.url);
    });
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  logout() {
    this.router.navigateByUrl("/");
  }
  
}
