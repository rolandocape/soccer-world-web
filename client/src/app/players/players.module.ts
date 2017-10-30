import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {PlayersComponent} from './players.component';

const playersRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'league-details/:league_slug/players/:fullname',
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
  providers: []
})
export class PlayersModule {
}
