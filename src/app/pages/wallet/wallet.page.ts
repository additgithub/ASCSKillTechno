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
   AdminInqDetails = [];
   Selstatus:any='Credit'
  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

  }
  ionViewDidEnter() {
   // this.getStatusList();
  }


  getAdminInquiryDetail() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      // postData.append('InquiryHdrID', this.GameID);

      this.tools.openLoader();
      this.apiService.AdminInqDetail(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response ', res);
        this.AdminInqDetails = res.data.InquiryDetail;
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
