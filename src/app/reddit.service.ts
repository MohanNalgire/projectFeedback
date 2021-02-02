import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RedditService {
  baseURL = 'https://www.reddit.com';

  constructor(private http: HttpClient) {}

  getReddit() {
    const url = `${this.baseURL}/subreddits/popular.json`;
    let params = new HttpParams();
    // default query paramters
    params = params.append('limit', '2');
    // params = params.append('offset', '0');

    return this.http.get(url, { params: params });
  }
}
