import {Component, OnInit, OnDestroy} from '@angular/core';
import {SoccerdataService} from "../services/soccerdata.service/soccerdata.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css']
})

export class LeagueDetailsComponent implements OnInit, OnDestroy {
  private leagueSlug: string;
  private subscription: any;
  public seasons: any;
  public scorers: any = [];
  public selectedSeason = "16-17";
  public details = {};
  public standings: any = [];
  public rounds: any = [];
  public referees: any = [];

  constructor(public dataService: SoccerdataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.leagueSlug = params['league_slug'];
      this.dataService.loadLeague(this.leagueSlug)
        .then(data => {
          this.details = data;
        });
      this.dataService.loadSeasons(this.leagueSlug)
        .then(data => {
          this.seasons = data;

        });
      this.getTopScorers(this.selectedSeason);
      this.getStandings(this.selectedSeason);
      this.getRounds(this.selectedSeason);
      this.getReferees(this.selectedSeason);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTopScorers(selectedSeason) {
    this.dataService.loadTopScorers(this.leagueSlug, selectedSeason)
      .then(data => {
        this.scorers = data;
      })
  }

  getStandings(selectedSeason) {
    this.dataService.loadStandings(this.leagueSlug, selectedSeason)
      .then(data => {
        this.standings = data;
      })
  }

  getRounds(selectedSeason) {
    this.dataService.loadRounds(this.leagueSlug, selectedSeason)
      .then(data => {
        this.rounds = data;
      })
  }

  getReferees(selectedSeason) {
    this.dataService.loadReferees(this.leagueSlug, selectedSeason)
      .then(data => {
        this.referees = data;
      })
  }

  goToTeamDetails(aTeam){
    this.router.navigateByUrl('/team/' + this.leagueSlug + '/' + this.selectedSeason + '/' + aTeam.team  + '/' + aTeam.team_identifier);
  }

  // goToRoundMatches(round){
  //   let roundSlug = round.round_slug;
  //   this.router.navigate(['/round_matches', {league: this.leagueSlug, season: this.selectedSeason, round_slug: roundSlug }], {relativeTo:this.route});
  // }

  goToRoundMatches(round){
    this.router.navigateByUrl('/round_matches/' + this.leagueSlug + '/' + this.selectedSeason + '/' + round.round_slug);
  }

  goToPlayerComponent(player){
    this.router.navigateByUrl('/player/' + this.leagueSlug + '/' + this.selectedSeason + '/' + player.team + '/' + player.player_identifier );
  }

}
