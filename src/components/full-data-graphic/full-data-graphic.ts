import { Component } from '@angular/core';

/**
 * Generated class for the FullDataGraphicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'full-data-graphic',
  templateUrl: 'full-data-graphic.html'
})
export class FullDataGraphicComponent {

  text: string;

  constructor() {
    console.log('Hello FullDataGraphicComponent Component');
    this.text = 'Hello World';
  }

}
