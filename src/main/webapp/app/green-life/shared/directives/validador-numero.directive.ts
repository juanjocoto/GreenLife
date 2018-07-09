import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[jhiValidadorNumero]'
})
export class ValidadorNumeroDirective implements OnInit {

  private validKeys = [
    'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5',
    'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ];

  private modelValue: number;

  @Input() minValue: number;
  @Output() modelChange = new EventEmitter();

  @Input() get model() { return this.modelValue; }
  set model(val) {
    this.modelValue = val;
    this.modelChange.emit(this.modelValue);
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    inputElement.addEventListener('keypress', (event: KeyboardEvent) => {
      if (!this.validKeys.includes(event.key)) {
        event.preventDefault();
      }
    });

    if (this.modelValue) {
      inputElement.value = this.model.toString();
      inputElement.onchange = (event) => {
        if (this.minValue && parseFloat(inputElement.value) < this.minValue) {
          this.model = this.minValue;
          inputElement.value = this.model.toString();
        } else {
          this.model = parseInt(inputElement.value, undefined);
        }
      };
    }
  }

}
