import {Component, OnInit, OnDestroy} from '@angular/core';
import {PlayersService} from "../services/players.service/players.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit, OnDestroy {
  private subscription: any;
  private leagueSlug: any;
  private seasonSlug: any;
  private playerIdentifier: any;
  private teamName:any;
  private teamSlug: any;
  public playerDetails: any;
  public teamPlayerDetails: any;

  constructor(private playerService: PlayersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.leagueSlug = params['league_slug'];
      this.seasonSlug = params['season_slug'];
      this.teamName = params['team'];
      this.playerIdentifier = params['player_identifier'];
      this.teamSlug = this.teamName.toLowerCase();

      this.playerService.loadPlayer(this.leagueSlug, this.seasonSlug, this.playerIdentifier)
        .then(data => {
          this.playerDetails = data;
        });
      this.playerService.loadTeamPlayer(this.leagueSlug, this.seasonSlug, this.teamSlug, this.playerIdentifier)
        .then(data => {
          this.teamPlayerDetails = data;
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
