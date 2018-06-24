import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[jhiValidadorNumero]'
})
export class ValidadorNumeroDirective implements OnInit {

  private validKeys = [
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Digit0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0'
  ];

  constructor(private el: ElementRef) { }

  ngOnInit() {
    (<HTMLInputElement>this.el.nativeElement).addEventListener('keypress', (event: KeyboardEvent) => {
      if (!this.validKeys.includes(event.key)) {
        event.preventDefault();
      }
    });
  }

}
