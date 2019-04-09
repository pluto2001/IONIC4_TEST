import { MicrogearService } from './services/microgear.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from "@angular/fire";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "@angular/fire/database";
import { MyserviceService } from './services/myservice.service';

export const firebaseConfig = {
  apiKey: "AIzaSyBW7f8-ZKYF70YR1t_3kLpabtUG7Rs6ojU",
  authDomain: "ionic-5697d.firebaseapp.com",
  databaseURL: "https://ionic-5697d.firebaseio.com",
  projectId: "ionic-5697d",
  storageBucket: "ionic-5697d.appspot.com",
  messagingSenderId: "225306514297"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AngularFireDatabase,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MyserviceService,
    MicrogearService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
