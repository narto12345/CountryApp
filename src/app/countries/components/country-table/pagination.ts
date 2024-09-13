import { PaginationButton } from '../../interfaces/pagination-button';

export class Pagination {
  private _button1!: PaginationButton;
  private _button2!: PaginationButton;
  private _button3!: PaginationButton;

  constructor() {
    this.resetValues();
  }

  public setInitialValues(pageNumbre: number): void {
    switch (pageNumbre) {
      case 1: {
        this.resetValues();
        this._button1 = this.setButton(1, true);
        break;
      }
      case 2: {
        this.resetValues();
        this._button1 = this.setButton(1, true);
        this._button2 = this.setButton(2, true);
        break;
      }
      default: {
        this.resetValues();
        this._button1 = this.setButton(1, true);
        this._button2 = this.setButton(2, true);
        this._button3 = this.setButton(3, true);
        break;
      }
    }
  }

  public get button1(): PaginationButton {
    return this._button1;
  }

  public get button2(): PaginationButton {
    return this._button2;
  }

  public get button3(): PaginationButton {
    return this._button3;
  }

  public setNavigationValues(currentPage: number, pagesNumber: number): void {
    if (pagesNumber <= 3) {
      return;
    }

    if (currentPage === 1) {
      this._button1 = this.setButton(1, true);
      this._button2 = this.setButton(2, true);
      this._button3 = this.setButton(3, true);
      return;
    }

    if (currentPage === pagesNumber) {
      this._button1 = this.setButton(pagesNumber - 2, true);
      this._button2 = this.setButton(pagesNumber - 1, true);
      this._button3 = this.setButton(pagesNumber, true);
      return;
    }

    this._button1 = this.setButton(currentPage - 1, true);
    this._button2 = this.setButton(currentPage, true);
    this._button3 = this.setButton(currentPage + 1, true);

  }

  private setButton(value: number, status: boolean): PaginationButton {
    return {
      status: status,
      value: value
    }
  }

  private resetValues(): void {
    this._button1 = this.setButton(1, false);
    this._button2 = this.setButton(2, false);
    this._button3 = this.setButton(3, false);
  }
}
