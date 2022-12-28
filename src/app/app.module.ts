import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { AppStoreModule } from 'src/store/AppStoreModule';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [AppComponent ,LoadingComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    StoreModule.forRoot({}, {}),
    ...AppStoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
