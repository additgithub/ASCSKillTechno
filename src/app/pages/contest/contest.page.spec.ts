import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ContestPage } from './contest.page';


describe('HomePage', () => {
  let component: ContestPage;
  let fixture: ComponentFixture<ContestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
