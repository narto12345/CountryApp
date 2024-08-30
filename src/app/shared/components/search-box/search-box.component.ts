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
  public placeHolder: string = "";

  @Input()
  public initialValue: string = "";

  @Output()
  public onValue = new EventEmitter<string>();

  @ViewChild('textInput') inputElement!: ElementRef<HTMLInputElement>;

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

}
