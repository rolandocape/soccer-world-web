import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {MatchComponent} from "./match.component";
import {MatchService} from "../services/match.service/match.service";

const matchRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'match/:league_slug/:season_slug/:round_slug/:match_slug',
    component: MatchComponent,
  }
]);

@NgModule({
  imports: [
    matchRouting,
    CommonModule
  ],
  declarations: [
    MatchComponent
  ],
  providers: [MatchService]
})
export class MatchModule {
}
