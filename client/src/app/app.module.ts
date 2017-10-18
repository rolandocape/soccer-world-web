import {BrowserModule} from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';

import {MatGridListModule} from '@angular/material';

import {AppComponent} from './app.component';
import {SoccerdataService} from "./sevices/soccerdata.service";
import {FooterComponent} from './shared/layout/footer/footer.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {SidenavComponent} from "./shared/layout/sidenav/sidenav.component";
import {HomeModule} from './home/home.module';
import {LeagueDetailsModule} from "./league-details/league-details.module";


// const routes: Routes = [
//   {path: '', redirectTo: 'home', pathMatch: 'full'},
//   {path: 'home', component: HomeComponent},
//   {path: 'league-details', component: LeagueDetailsComponent}
// ];


const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {useHash: true});

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LeagueDetailsModule,
    HomeModule,
    rootRouting,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
  ],
  providers: [SoccerdataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
