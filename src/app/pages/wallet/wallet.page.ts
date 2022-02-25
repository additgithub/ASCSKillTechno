import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

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

  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {
  }

  ionViewDidEnter() {
    this.getWalletDetails();
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

  getWalletDetails() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.GetWalletDetails().subscribe(data => {
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
        this.getWalletDetails();
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
}
