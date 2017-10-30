import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {TeamsComponent} from './teams.component';
import {TeamsService} from "../services/teams.service/teams.service";

const teamsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    // path: 'league-details/:league_slug/teams/:team_name',
    path: 'team',
    component: TeamsComponent,
  }
]);

@NgModule({
  imports: [
    teamsRouting,
    CommonModule
  ],
  declarations: [
    TeamsComponent
  ],
  providers: [TeamsService]
})
export class TeamsModule {
}
