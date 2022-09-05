import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { WalletFilterModelComponent } from 'src/app/model/walletfilter/walletfilter.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: 'wallet.page.html',
  styleUrls: ['wallet.page.scss'],
})
export class walletPage {
   Selstatus:any=''

   amount:any='';
   firstAdd=false;
   DisplayAmount:any=0;

   TransactionList = [];
   ShowClear:any='0';

  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,public modalController: ModalController,
    private apiService: ApiService, private router: Router) {
  }

  ionViewDidEnter() {
    this.getWalletDetails("","");
  }

  addMoney(){
    if(this.firstAdd){
      if(this.amount == ''){
        this.tools.openNotification("Enter Amount");
      }else{
        this.AddWalletAmt();
      }
    }else{
      this.firstAdd=true;
    }
  

  }

  getWalletDetails(FROM,TO) {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();

      postData.append('StartDate', FROM);
      postData.append('EndDate', TO);
  
      this.apiService.GetWalletDetails(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log('wallet Response ', res);
        console.log('wallet Response ', res.data.GetAmout.WalletAmt);
        this.DisplayAmount=res.data.GetAmout.WalletAmt
        this.TransactionList=res.data.PaymentList

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
  clear(){
    localStorage.setItem('FD','');
    localStorage.setItem('TD','');
    this.ShowClear='0';
    this.getWalletDetails("","");
  }

  AddWalletAmt() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append('WalletAmt', this.amount);

      this.tools.openLoader();
      this.apiService.AddWalletAmt(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response ', res);
        this.tools.openNotification(res.message)
        this.amount=''
        this.firstAdd=false
        this.getWalletDetails("","");
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
  ionViewWillLeave() {
    localStorage.setItem('FD','');
    localStorage.setItem('TD','');
    this.ShowClear='0';
    console.log("callll>>>>>")
} 

  async WalletFilter(){
   
      // console.log("scripName >>",this.scripName)
      // console.log("Game ID >>",this.GameID)
      // console.log("GamePriceID >>",GamePriceID)
        const modal = await this.modalController.create({
          component: WalletFilterModelComponent,
          cssClass: 'add-review-modal',
          componentProps: {FromDate: "",ToDate:"" },

        });
        await modal.present();
        await modal.onDidDismiss()
          .then((data) => {
            console.log('Selected Cart Items from Dilogs ',data);
            console.log('Selected Cart Items from Dilogs ',data.data);

            if (data.data) {
              // this.getOrderData(data.data[0].SelStatus,data.data[1].SelOrderType,"",
              //   data.data[2].SelFromDate,data.data[3].SelToDate,data.data[4].SelSortBy);
              console.log('Selected FD ',data.data.FD);
              console.log('Selected TD ',data.data.TD);
              this.getWalletDetails(data.data.FD,data.data.TD);
              this.ShowClear='1';

            }
          });
      
  }
}
