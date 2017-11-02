import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {PlayersComponent} from './players.component';
import {PlayersService} from "../services/players.service/players.service";

const playersRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'player/:league_slug/:season_slug/:player_identifier',
    component: PlayersComponent,
  }
]);

@NgModule({
  imports: [
    playersRouting,
    CommonModule
  ],
  declarations: [
    PlayersComponent
  ],
  providers: [PlayersService]
})
export class PlayersModule {
}
