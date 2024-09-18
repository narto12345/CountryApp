import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchType } from '../../enums/search-type-enum';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public placeholder: string = "Ingrese un país";
  public countries: Country[] = [];
  public flagLoading: boolean = false;
  public initialValue: string = "";
  public pageSize!: number;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.country.countries;
    this.initialValue = this.countriesService.cacheStore.country.term;
    this.pageSize = this.countriesService.pageSize;
  }

  public searchByCountry(term: string): void {
    this.flagLoading = true;
    this.countriesService.searchCountries(term, SearchType.ByCountry).subscribe(response => {
      this.flagLoading = false;
      this.countries = response;
    });
  }

  public changePageSize(pageSizeOutPut: string) {
    this.pageSize = Number(pageSizeOutPut);
  }
}
