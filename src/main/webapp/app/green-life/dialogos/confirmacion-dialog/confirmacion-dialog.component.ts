import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-confirmacion-dialog',
  templateUrl: './confirmacion-dialog.component.html',
  styles: []
})
export class ConfirmacionDialogComponent implements OnInit {

  @Input() texto: string;

  constructor() { }

  ngOnInit() {
  }

}
