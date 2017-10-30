import {ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';

import {LeagueDetailsComponent} from './league-details.component';
import {SoccerdataService} from "../services/soccerdata.service/soccerdata.service";

const leagueDetailsRouting: ModuleWithProviders = RouterModule.forChild([{
  path: 'league-details/:league_slug',
  component: LeagueDetailsComponent
}]);

@NgModule({
  imports: [
    leagueDetailsRouting,
    CommonModule,
    BrowserModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule

  ],
  declarations: [
    LeagueDetailsComponent
  ],
  providers: [SoccerdataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeagueDetailsModule {
}
