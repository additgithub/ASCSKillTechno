import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SettingScrenPage } from './settingscren.page';


describe('HomePage', () => {
  let component: SettingScrenPage;
  let fixture: ComponentFixture<SettingScrenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingScrenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingScrenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
