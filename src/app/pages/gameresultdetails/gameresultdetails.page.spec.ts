import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GameResultDetailsPage } from './gameresultdetails.page';


describe('HomePage', () => {
  let component: GameResultDetailsPage;
  let fixture: ComponentFixture<GameResultDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameResultDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameResultDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
