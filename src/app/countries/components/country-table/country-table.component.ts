import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Country } from '../../interfaces/country';
import { Pagination } from './pagination';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css']
})
export class CountryTableComponent implements OnInit, OnChanges {

  @Input()
  public countries: Country[] = [];

  @Input()
  public pageSize!: number;

  public visibleCountries: Country[] = [];

  public pageNumber!: number;
  public currentPage: number = 1;

  public pagination!: Pagination;

  constructor(private countriesService: CountriesService) {

  }

  ngOnInit(): void {
    this.pageSize = this.countriesService.pageSize;
    this.setInitialCountries();
    this.cutTheArray(this.currentPage);
    this.pagination = new Pagination();
    this.pagination.setInitialValues(this.pageNumber);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Esto se ejecuta cuando la propiedad "countries" se le efectua un cambio
    if (changes['countries'] || changes['pageSize']) {
      this.pageSize = this.countriesService.pageSize;
      this.setInitialCountries();
      this.currentPage = 1;
      this.cutTheArray(this.currentPage);
      this.pagination?.setInitialValues(this.pageNumber);
    }
  }

  public cutTheArray(indexPage: number): void {
    const beginning: number = (indexPage * this.pageSize) - this.pageSize;
    this.visibleCountries = this.countries.slice(beginning, beginning + this.pageSize);
    this.currentPage = indexPage;
    this.pagination?.setNavigationValues(indexPage, this.pageNumber);
  }

  public movePage(moveDirection: number): void {
    let move = this.currentPage + moveDirection;

    if (move < 1) move = 1;
    if (move > this.pageNumber) move = this.pageNumber;

    this.cutTheArray(move);
  }

  private setInitialCountries(): void {
    const floatpagesDecimal: number = this.countries.length / this.pageSize;
    this.pageNumber = Number(floatpagesDecimal.toFixed(0));

    if (floatpagesDecimal > this.pageNumber) {
      this.pageNumber++;
    }
  }

}
