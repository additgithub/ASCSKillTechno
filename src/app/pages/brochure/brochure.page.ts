import { EventService } from '../../services/EventService';
import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-brochure',
  templateUrl: 'brochure.page.html',
  styleUrls: ['brochure.page.scss'],
})
export class BrochurePage {
  loginForm: FormGroup;
  MachineList: [];
  PDFList: [];
  displayMSG="";
  constructor(public pickerCtrl: PickerController, public tools: Tools, public formBuilder: FormBuilder, private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService) {
    this.loginForm = this.formBuilder.group({
      machine: ['', [Validators.required]],
    });
  }

  ionViewDidEnter() {
    this.getMachineList();
  }

  onChangeState(MachineID) {
    console.log('Select MachineID ' + MachineID);
    this.getPDFList(MachineID);
  }

  getMachineList() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.MachineList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response ', res);
        this.MachineList = res.data.Machine;

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

  getPDFList(MachineID) {
      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        let postData = new FormData();

        postData.append('MachineID',MachineID);
        this.apiService.getMachinePdfList(postData).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          console.log('Api PDFList >> ', res);
        
          this.PDFList= [];
          this.PDFList = res.data.Machine;

         

        }, (error: Response) => {
          let err: any = error;
          console.log('Api Error ', err);

          this.tools.closeLoader();
          this.tools.openAlertToken(err.status, err.error.message);
          console.log('Api Error >>>> ', err.error.message);

        });
    }
  }

  dPDF(url){
    window.open(url,"_system","location=yes,enableViewportScale=yes,hidden=no");

  }
}
