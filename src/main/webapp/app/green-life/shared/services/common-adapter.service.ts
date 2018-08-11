import { Injectable } from '@angular/core';

@Injectable()
export class CommonAdapterService {

  constructor() { }

  dateToJHILocalDate(date: Date) {
    return new JHILocalDate(date);
  }

}

export class JHILocalDate {
  public year: number;
  public month: number;
  public day: number;

  constructor();
  constructor(date: Date);
  constructor(year: number, month: number, day: number);
  constructor(value?: number | Date, month?: number, day?: number) {
    if (!value) {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();

    } else if (value instanceof Date) {
      this.year = value.getFullYear();
      this.month = value.getMonth() + 1;
      this.day = value.getDate();
    } else {
      this.year = value;
      this.month = month;
      this.day = day;
    }
  }
}
