import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventService{
  public formRefreshAnnouncedSource = new Subject();
  public formNew = new Subject();
  public formResetCount = new Subject();
  public UpdateCartDel = new Subject();
  public formLocation = new Subject();
  public formCart = new Subject();
  public pageTitle = new Subject();
  formRefreshSource$ = this.formRefreshAnnouncedSource.asObservable();
  formNew$ = this.formNew.asObservable();
  formLocation$ = this.formLocation.asObservable();
  formCart$ = this.formCart.asObservable();
  formResetCount$ = this.formResetCount.asObservable();
  UpdateCartDel$ = this.UpdateCartDel.asObservable();
  pageTitle$ = this.pageTitle.asObservable();

  publishFormRefresh(isEdit){
    this.formRefreshAnnouncedSource.next(isEdit)
  }
  publishFormNew(isEdit){
    this.formNew.next(isEdit)
  }
  publishFormLocation(){
    this.formLocation.next()
  }
  publishFormCart(item){
    this.formCart.next(item)
  }
  publishFormResetCount(cnt){
    this.formResetCount.next(cnt)
  }
  publishUpdateCartDel(cnt){
    this.UpdateCartDel.next(cnt)
  }
  publishPageTitle(pageTitle){
    this.pageTitle.next(pageTitle)
  }

}