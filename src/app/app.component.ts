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
    private toast: ToastController,
    public modalCtrl: ModalController,
) {

    this.initializeApp();
    this.backButtonEvent();
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
 
  callOneSignal() {
    this.oneSignal.startInit('9b0e84fb-5e5c-42dc-8582-84ef7c9e4c52', '546015657170');

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
      localStorage.setItem('PlearID',id.userId);      
    });
  }
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(999999, async () => {

      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
            element.dismiss();
            return;
        }
    } catch (error) {
        console.log(error);
  
    }

      console.log('subscribeWithPriority Route URL ', this.router.url);
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
        
        // } else if (this.router.url === '/route-list') {
        //   outlet.pop();
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
