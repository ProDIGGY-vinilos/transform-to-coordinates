import { Component, Input } from '@angular/core';
import { Address } from '../model/address';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss'],
})
export class ShowResultComponent {
  @Input()
  address!: Address;
}
