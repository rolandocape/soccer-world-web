import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RoundMatchesService {
  public data;

  constructor(private http: Http) { }

  loadRoundMatches(league_slug, season_slug, round_slug) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/roundMatches/' + league_slug + '/' + season_slug + '/' + round_slug)
        .map(res => {
          if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed' + res.status);
          } else {
            return res.json();
          }
        })
        .subscribe( data => {
          this.data = data;
          resolve(this.data);
        })
    })
  }

}
