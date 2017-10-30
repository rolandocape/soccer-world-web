import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material';


import {HomeComponent} from './home.component';
import {SoccerdataService} from "../services/soccerdata.service/soccerdata.service";

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
  }
]);

@NgModule({
  imports: [
    homeRouting,
    CommonModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  declarations: [
    HomeComponent,
    // LeagueDetailsComponent
  ],
  providers: [SoccerdataService]
})
export class HomeModule {
}
