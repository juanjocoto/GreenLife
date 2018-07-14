import { Injectable } from '@angular/core';

@Injectable()
export class CommonAdapterService {

  constructor() { }

  dateToJHILocalDate(date: Date) {
    return new JHILocalDate(date.getFullYear(), date.getMonth(), date.getDay());
  }

}

export class JHILocalDate {
  constructor(public year: number, public month: number, public day: number) { }
}
