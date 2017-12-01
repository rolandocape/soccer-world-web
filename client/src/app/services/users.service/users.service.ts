import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  public data;

  constructor(private http: Http) {
  }

  userLogin(username: string, password: string) {
    return new Promise(resolve => {
      this.http.post('http://localhost:3000/login', {username: username, password: password})
        .map(res => {
          if (res.status < 200 || res.status >= 300) {
            throw new Error('this request has failed' + res.status);
          } else {
            return res.json();
          }
        }).subscribe(data => {
        this.data = data;
        resolve(this.data);
      })
    })

  }

  userRegister(username: string, password: string, firstname: string, lastname: string) {
    return new Promise(resolve => {
      this.http.post('http://localhost:3000/register', {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname
      })
        .map(res => {
          if (res.status < 200) {
            throw new Error('this request has failed' + res.status);
          } else {
            return res.json();
          }
        }).subscribe(data => {
        this.data = data;
        resolve(this.data);
      })
    })
  }


}

