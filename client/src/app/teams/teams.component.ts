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
  public teamDetails: {};

  constructor(public teamService: TeamsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.leagueSlug = this.route.snapshot.params['league'];
      this.seasonSlug = this.route.snapshot.params['season'];
      this.teamName = this.route.snapshot.params['nameTeam'];

      this.teamService.loadTeam(this.leagueSlug, this.seasonSlug, this.teamName)
        .then(data => {
          this.teamDetails = data;
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
