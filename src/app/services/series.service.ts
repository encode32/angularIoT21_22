import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  apiURL = 'https://api.themoviedb.org/3/tv/';
  language = '&language=es-ES';
  constructor(private httpClient: HttpClient) {}

  getTopRated() {
    const url = `${this.apiURL}top_rated?${environment.apiKey}${this.language}`;
    return this.httpClient.get(url).pipe((map((data: any) => {
      return data.results.slice(0, 5);
    })));
  }

  getPopular(page?: number) {
    if(page) {
      const url = `${this.apiURL}popular?${environment.apiKey}${this.language}&page=${page}`;
      return this.httpClient.get(url);
    } else {
      const url = `${this.apiURL}popular?${environment.apiKey}${this.language}`;
      return this.httpClient.get(url).pipe(
        map((data: any) => {
          return data.results;
        })
      ); 
    }
  }

  getSerieDetails(id: string) {
    const url = `${this.apiURL}${id}?${environment.apiKey}${this.language}`;
    return this.httpClient.get(url);
  }

  getSeasonDetails(id: string, seasonId: string) {
    const url = `${this.apiURL}${id}/season/${seasonId}?${environment.apiKey}${this.language}`;
    return this.httpClient.get(url);
  }

  getCredits(id: string, seasonId: string) {
    const url = `${this.apiURL}${id}/season/${seasonId}/credits?${environment.apiKey}${this.language}`;
    return this.httpClient.get(url);
  }
}
