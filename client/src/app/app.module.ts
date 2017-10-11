import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import { RouterModule } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';

import {MatGridListModule} from '@angular/material';

import { AppComponent } from './app.component';
import {SoccerdataService} from "./sevices/soccerdata.service";
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import {SharedModule} from "./shared/shared-module";
import {HomeModule} from './home/home.module';
import { LeagueDetailsComponent } from './league-details/league-details.component';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LeagueDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    HomeModule,
    rootRouting,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule
  ],
  providers: [SoccerdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
