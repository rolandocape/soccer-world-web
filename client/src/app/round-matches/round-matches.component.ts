import {Component, OnInit, OnDestroy} from '@angular/core';
import {RoundMatchesService} from "../services/round-matches.service/round-matches.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-round-matches',
  templateUrl: './round-matches.component.html',
  styleUrls: ['./round-matches.component.css']
})

export class RoundMatchesComponent implements OnInit, OnDestroy {
  private subscription: any;
  private leagueSlug: any;
  private seasonSlug: any;
  private roundSlug: any;
  public matches: any = [];

  constructor(public matchesService: RoundMatchesService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.leagueSlug = params['league'];
      this.seasonSlug = params['season'];
      this.roundSlug = params['round_slug'];

      this.matchesService.loadRoundMatches(this.leagueSlug, this.seasonSlug, this.roundSlug)
        .then(data => {
          this.matches = data;
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToMatchComponent(match){
    this.router.navigateByUrl('match/' + this.leagueSlug + '/' + this.seasonSlug + '/' + this.roundSlug + '/' + match.match_slug);
  }

}
