import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchType } from '../../enums/search-type-enum';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public placeholder: string = "Ingrese una región";
  public countries: Country[] = [];
  public flagLoading: boolean = false;
  public regions: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  public regionSelected?: string;
  public pageSize!: number;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.region.countries;
    this.regionSelected = this.countriesService.cacheStore.region.term;
    this.pageSize = this.countriesService.pageSize;
  }

  public searchByRegion(term: string): void {
    this.regionSelected = term;
    this.flagLoading = true;
    this.countriesService.searchCountries(term, SearchType.ByRegion).subscribe(response => {
      this.flagLoading = false;
      this.countries = response;
    });
  }

  public changePageSize(pageSizeOutPut: string) {
    this.pageSize = Number(pageSizeOutPut);
  }
}
