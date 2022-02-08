import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UpcomingGamesPage } from './upcominggames.page';


describe('HomePage', () => {
  let component: UpcomingGamesPage;
  let fixture: ComponentFixture<UpcomingGamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingGamesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingGamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
