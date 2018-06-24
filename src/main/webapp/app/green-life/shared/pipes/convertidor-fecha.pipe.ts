import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertidorFecha'
})
export class ConvertidorFechaPipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    return {
      year: value.getFullYear(),
      month: value.getMonth() + 1,
      day: value.getDay()
    };
  }

}
