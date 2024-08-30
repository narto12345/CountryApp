import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchType } from '../../enums/search-type-enum';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country!: Country;
  public codeCountry: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.codeCountry = id;
    });

    this.countriesService.searchCountries(this.codeCountry, SearchType.Detail)
      .subscribe(responsive => {
        if (responsive.length > 0) {
          this.country = responsive[0];
        } else {
          return this.router.navigateByUrl("/")
        }
        return;
      });

  }


}
