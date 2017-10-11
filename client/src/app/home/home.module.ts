import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material';


import { HomeComponent } from './home.component';
import {LeagueDetailsComponent} from "../league-details/league-details.component";
import { SharedModule } from '../shared';
import {SoccerdataService} from "../sevices/soccerdata.service";

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'league-details',
    component: LeagueDetailsComponent
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule,
    CommonModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  declarations: [
    HomeComponent

  ],
  providers: [SoccerdataService]
})
export class HomeModule {}
