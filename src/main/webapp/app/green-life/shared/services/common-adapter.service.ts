import { Injectable } from '@angular/core';

@Injectable()
export class CommonAdapterService {

  constructor() { }

  dateToJHILocalDate(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDay()
    };
  }

}
