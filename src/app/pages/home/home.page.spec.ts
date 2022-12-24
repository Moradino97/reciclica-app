import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Route, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeCardComponent } from 'src/app/components/home-card/home-card.component';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router : Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage, HomeCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);

    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to pick up calls page on see all', () => {
    spyOn(router, 'navigate');
    component.goToPickUpCalls();
    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls']);
  });

  it('should go to new pick up call page on create pickup call ', () => {
    spyOn(router, 'navigate');
    component.newPickupCall();
    expect(router.navigate).toHaveBeenCalledWith(['pickup-call']);
  })

});
