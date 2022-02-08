import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { walletPage } from './wallet.page';


describe('HomePage', () => {
  let component: walletPage;
  let fixture: ComponentFixture<walletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ walletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(walletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
