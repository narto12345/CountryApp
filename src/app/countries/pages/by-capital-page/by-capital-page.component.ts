import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchType } from '../../enums/search-type-enum';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  public placeholder: string = "Ingrese una capital";
  public countries: Country[] = [];
  public flagLoading: boolean = false;
  public initialValue: string = "";
  public pageSize!: number;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.capital.countries;
    this.initialValue = this.countriesService.cacheStore.capital.term;
    this.pageSize = this.countriesService.pageSize;
  }

  public searchByCapital(term: string): void {
    this.flagLoading = true;
    this.countriesService.searchCountries(term, SearchType.ByCapital).subscribe(response => {
      this.flagLoading = false;
      this.countries = response;
    });
  }

  public changePageSize(pageSizeOutPut: string) {
    this.pageSize = Number(pageSizeOutPut);
  }
}
