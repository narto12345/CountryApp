import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, delay, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { SearchType } from '../enums/search-type-enum';
import { SearchValues } from '../interfaces/search-values';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  public cacheStore: SearchValues = {
    capital: {
      term: "",
      countries: []
    },
    country: {
      term: "",
      countries: []
    },
    region: {
      term: "",
      countries: []
    }
  }

  constructor(private http: HttpClient) { }

  public searchCountries(value: string, searchType: SearchType): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/${searchType}/${value}`)
      .pipe(
        delay(500),
        catchError(() => of([])),
        tap((countries) => {
          switch (searchType) {
            case SearchType.ByCapital: {
              this.cacheStore.capital = { term: value, countries: countries }
              break;
            }
            case SearchType.ByCountry: {
              this.cacheStore.country = { term: value, countries: countries }
              break;
            }
            case SearchType.ByRegion: {
              this.cacheStore.region = { term: value, countries: countries }
              break;
            }
          }
        })
      );
  }

}
