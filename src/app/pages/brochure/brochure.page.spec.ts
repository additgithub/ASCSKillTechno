import { BrochurePage } from './brochure.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('RegisterPage', () => {
  let component: BrochurePage;
  let fixture: ComponentFixture<BrochurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrochurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrochurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
