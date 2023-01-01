import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { provideMockStore } from '@ngrx/store/testing';
import { LoginPage } from './login.page';
import { loadingReducer } from 'src/store/loading/loading.reducer';
import { loginReducer } from 'src/store/login/login.reducer';
import { recoverePassword, recoverePasswordFail, recoverePasswordSuccess } from 'src/store/login/login.actions';
import { AppState } from 'src/store/AppState';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page;
  let store : Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("loading",loadingReducer),
        StoreModule.forFeature("login",loginReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);

    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = fixture.debugElement.nativeElement;
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);
  }));

  it('should create form on init ', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  })
  it('should go to home page on login', () => {
    spyOn(router, 'navigate');
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should go to register page on login', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {
    fixture.detectChanges();
    component.form.get('email').setValue("valid@emial.com");
    page.querySelector("#recoverPasswordButton").click();
    store.select('login').subscribe(loginState =>{
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  });

  it('should show loading when recovering password', () => {
    fixture.detectChanges();
    store.dispatch(recoverePassword());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  });

  it('should hide loading and show success message when has recovered password', () => {
    spyOn(toastController,'create');
    
    fixture.detectChanges();
    store.dispatch(recoverePassword());
    store.dispatch(recoverePasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });



  it('should hide loading and show error message when error on recover password', () => {
    spyOn(toastController,'create');
    
    fixture.detectChanges();
    store.dispatch(recoverePassword());
    store.dispatch(recoverePasswordFail({error : "message"}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

});
