import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-root',
  templateUrl: './root.component.html',
  styles: [`
    .main-container{
      margin: 57px 0px 0px;
      min-height: calc(100vh - 345px);
      padding-bottom: 50px;
    }
  `]
})
export class RootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
