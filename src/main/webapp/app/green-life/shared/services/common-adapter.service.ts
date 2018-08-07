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

  constructor(date: Date);
  constructor(year: number, month: number, day: number);
  constructor(value: number | Date, month?: number, day?: number) {
    if (value instanceof Date) {
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
