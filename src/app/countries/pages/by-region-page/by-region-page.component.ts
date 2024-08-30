import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchType } from '../../enums/search-type-enum';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public placeholder: string = "Ingrese una región";
  public countries: Country[] = [];
  public flagLoading: boolean = false;
  public regions: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  public regionSelected?: string;

  constructor(private countriesService: CountriesService) { }

  public searchByRegion(term: string): void {
    this.regionSelected = term;
    this.flagLoading = true;
    this.countriesService.searchCountries(term, SearchType.ByRegion).subscribe(response => {
      this.flagLoading = false;
      this.countries = response;
    });
  }
}
