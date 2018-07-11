import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'colon'
})
export class ColonPipe implements PipeTransform {
    transform(value: number, ...args: any[]);
    transform(value: string, ...args: any[]);
    transform(value: string | number, ...args: any[]) {
        let numericValue: number = <number>value;
        if (isNaN(<number>value)) {
            numericValue = 0;
        }
        if (typeof value === 'string') {
            numericValue = parseFloat(value);
        }
        return numericValue.toLocaleString('es-CR', { style: 'currency', currency: 'CRC' }).replace('CRC', '₡');
    }
}
