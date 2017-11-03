import { Component, OnInit, OnDestroy } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {MatchService} from "../services/match.service/match.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, OnDestroy {

  private subscription: any;
  private leagueSlug: any;
  private seasonSlug: any;
  private roundSlug: any;
  private matchSlug: any;
  public matchDetails: any;

  constructor(public matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params =>{
      this.leagueSlug = params['league_slug'];
      this.seasonSlug = params['season_slug'];
      this.roundSlug = params['round_slug'];
      this.matchSlug = params['match_slug'];

      this.matchService.loadMatch(this.leagueSlug, this.seasonSlug, this.roundSlug, this.matchSlug)
        .then(data =>{
          this.matchDetails = data;
        });
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
