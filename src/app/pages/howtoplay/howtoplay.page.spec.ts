import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HowToPlayPage } from './howtoplay.page';


describe('RegisterPage', () => {
  let component: HowToPlayPage;
  let fixture: ComponentFixture<HowToPlayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToPlayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToPlayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
