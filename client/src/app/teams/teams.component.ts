import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamsService} from "../services/teams.service/teams.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {
  private subscription: any;
  private leagueSlug: any;
  private seasonSlug: any;
  private teamName: any;
  public teamDetails: any;
  private teamIdentifier : any;
  private teamSlug: any;
  public teamMatches: any = [];
  public teamPlayers: any = [];
  public managerDetails: any;

  constructor(public teamService: TeamsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.leagueSlug = this.route.snapshot.params['league'];
      this.seasonSlug = this.route.snapshot.params['season'];
      this.teamName = this.route.snapshot.params['nameTeam'];
      this.teamSlug = this.teamName.toLowerCase();
      this.teamIdentifier = this.route.snapshot.params['team_identifier'];

      this.teamService.loadTeam(this.leagueSlug, this.seasonSlug, this.teamName)
        .then(data => {
          this.teamDetails = data;
        });
      this.teamService.loadTeamMatches(this.leagueSlug, this.seasonSlug, this.teamIdentifier)
        .then(data =>{
          this.teamMatches = data;
        });
      this.teamService.loadTeamPlayers(this.leagueSlug, this.seasonSlug, this.teamSlug)
        .then(data =>{
          this.teamPlayers = data;
        });
      this.teamService.loadTeamManager(this.leagueSlug, this.seasonSlug, this.teamSlug)
        .then(data =>{
          this.managerDetails = data;
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
