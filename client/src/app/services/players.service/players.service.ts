import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayersService {
  public data;

  constructor(private http: Http) { }

}
