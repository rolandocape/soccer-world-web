import {BrowserModule} from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from '@angular/router';
import { FormsModule }   from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatToolbarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';

import {MatGridListModule} from '@angular/material';

import {AppComponent} from './app.component';
import {SoccerdataService} from "./services/soccerdata.service/soccerdata.service";
import {FooterComponent} from './shared/layout/footer/footer.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {SidenavComponent} from "./shared/layout/sidenav/sidenav.component";
import {HomeModule} from './home/home.module';
import {LeagueDetailsModule} from "./league-details/league-details.module";
import {TeamsModule} from "./teams/teams.module";
import {RoundMatchesModule} from "./round-matches/round-matches.module";
import {PlayersModule} from "./players/players.module";
import {MatchModule} from "./match/match.module";
import {PopupModule} from "ng2-opd-popup";
import {UsersService} from "./services/users.service/users.service";


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
    TeamsModule,
    RoundMatchesModule,
    PlayersModule,
    MatchModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    PopupModule.forRoot(),
    FormsModule
  ],
  providers: [SoccerdataService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
