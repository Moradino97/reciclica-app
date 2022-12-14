import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.action';
import { recoverePassword, recoverePasswordFail, recoverePasswordSuccess } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/LoginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form!: FormGroup;
  loginStateSubscription: Subscription;
  constructor(private router: Router, private formBuilder:FormBuilder, private store : Store<AppState>,
    private toastController : ToastController, private authService: AuthService) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onRecoveredPassword(loginState);
      this.onRecoveringPassword(loginState);
      this.onRecoveredPasswordFail(loginState);
    })
  }

  ngOnDestroy(): void {
      if (this.loginStateSubscription){
        this.loginStateSubscription.unsubscribe();
      }
  }

  private async onRecoveredPasswordFail(loginState: LoginState){
    if(loginState.error){
      this.store.dispatch(hide());

      const toaster=await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color : "danger"
      });
      toaster.present();
    }
  }
  private onRecoveringPassword(loginState: LoginState){
    if(loginState.isRecoveringPassword){
      this.store.dispatch(show());

      this.authService.recoverEmailPassword(this.form.get('email').value).subscribe(() => {
        this.store.dispatch(recoverePasswordSuccess());
      }, error => {
         this.store.dispatch(recoverePasswordFail({error}))
    });
    }
  }
  private async onRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
      this.store.dispatch(hide());
      const toaster=await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color : "primary"
      });
      toaster.present();
    }
  }

  forgotEmailPassword(){
    this.store.dispatch(recoverePassword());
    
    /*this.store.dispatch(show())
    setTimeout(()=>{
      this.store.dispatch(hide())
    }, 3000)*/
  }
  login(){
    this.router.navigate(['home']);
  }
  register(){
    this.router.navigate(['register'])
  }
}
