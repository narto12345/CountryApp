import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { CountriesService } from '../../../countries/services/countries.service';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private tuboDeAgua: Subject<string> = new Subject<string>();

  @Input()
  public isRegion: boolean = false;

  @Input()
  public placeHolder: string = "";

  @Input()
  public initialValue: string = "";

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public pageSizeOutPut = new EventEmitter<string>();

  @ViewChild('textInput') inputElement!: ElementRef<HTMLInputElement>;

  public pageSixeComboBox: string[] = ["5", "10", "20", "40", "50", "100"];

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.tuboDeAgua
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.searchValue();
      });
  }

  ngOnDestroy(): void {
    this.tuboDeAgua.unsubscribe();
  }

  public searchValue(): void {
    this.onValue.emit(this.inputElement.nativeElement.value);
  }

  public onKeyPress(searchTerm: string) {
    this.tuboDeAgua.next(searchTerm);
  }

  public limitEvent(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Casting
    const selectedValue = selectElement.value;
    this.countriesService.pageSize = Number(selectedValue);
    this.pageSizeOutPut.emit(selectedValue);

    console.log(this.countriesService.pageSize);

  }

  public get limitSelected(): string {
    return this.countriesService.pageSize.toString();
  }

}
