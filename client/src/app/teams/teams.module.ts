import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material';

import {TeamsComponent} from './teams.component';
import {TeamsService} from "../services/teams.service/teams.service";

const teamsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    // path: 'league-details/:league_slug/teams/:team_name',
    // path: 'team',
    path: 'team/:league/:season/:nameTeam/:team_identifier',
    component: TeamsComponent,
  }
]);

@NgModule({
  imports: [
    teamsRouting,
    CommonModule,
    MatTabsModule
  ],
  declarations: [
    TeamsComponent
  ],
  providers: [TeamsService]
})
export class TeamsModule {
}
