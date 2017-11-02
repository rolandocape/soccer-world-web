import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {RoundMatchesComponent} from "./round-matches.component";
import {RoundMatchesService} from "../services/round-matches.service/round-matches.service";

const roundMatchesRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'round_matches/:league/:season/:round_slug',
    component: RoundMatchesComponent,
  }
]);

@NgModule({
  imports: [
    roundMatchesRouting,
    CommonModule
  ],
  declarations: [
    RoundMatchesComponent
  ],
  providers: [RoundMatchesService]
})
export class RoundMatchesModule{
}
