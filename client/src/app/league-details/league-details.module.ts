import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LeagueDetailsComponent} from './league-details.component';
import {SoccerdataService} from "../sevices/soccerdata.service";

const leagueDetailsRouting: ModuleWithProviders = RouterModule.forChild([{
  path: 'league-details/:league_slug',
  component: LeagueDetailsComponent
}]);

@NgModule({
  imports: [
    leagueDetailsRouting
  ],
  declarations: [
    LeagueDetailsComponent
  ],
  providers: [SoccerdataService]
})
export class LeagueDetailsModule {
}
