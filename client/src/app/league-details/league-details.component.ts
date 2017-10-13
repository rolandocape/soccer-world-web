import {Component, OnInit, OnDestroy} from '@angular/core';
import {SoccerdataService} from "../sevices/soccerdata.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css']
})
export class LeagueDetailsComponent implements OnInit, OnDestroy {
  private leagueSlug: string;
  private subscription: any;

  public details = {};
  public oneLeague: any;


  constructor(public dataService: SoccerdataService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.leagueSlug = params['league_slug'];
      this.dataService.loadLeague(this.leagueSlug)
        .then(data => {
          this.details = data;
        })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
