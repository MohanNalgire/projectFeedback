import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Users } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/users';
  loggedIn: boolean;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.url, { observe: 'body' });
  }

  public login(userInfo: User) {
    console.log('test on userInfo', userInfo);
    let paramters = new HttpParams();
    paramters = paramters.set('username', userInfo.username);
    paramters = paramters.set('password', userInfo.password);
    this.http
      .get(this.url, {
        params: paramters,
      })
      .subscribe(
        (user) => {
          console.log('Auth service data', user);
          sessionStorage.setItem('loginUser', JSON.stringify(user));
          localStorage.setItem(
            'ACCESS_TOKEN',
            '4234324234223423423423423423424'
          );
          this.loggedIn = user ? true : false;
        },
        (error) => {
          console.error('Error in auth service:', error);
        },
        () => {
          console.info('Auth service completed.');
        }
      );
    localStorage.setItem('ACCESS_TOKEN', 'access_token');
  }

  public isLoggedIn() {
    return this.loggedIn && localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    this.loggedIn = false;
    sessionStorage.removeItem('loginUser');
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
