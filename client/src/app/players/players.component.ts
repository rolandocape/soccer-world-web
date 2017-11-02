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
  public playerDetails: any;

  constructor(private playerService: PlayersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.leagueSlug = params['league_slug'];
      this.seasonSlug = params['season_slug'];
      this.playerIdentifier = params['player_identifier'];

      this.playerService.loadPlayer(this.leagueSlug, this.seasonSlug, this.playerIdentifier)
        .then(data => {
          this.playerDetails = data;
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
