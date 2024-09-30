import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {brandList} from "../constants";
import {Brand, Product} from "../type";

@Component({
  selector: 'app-brand-section',
  standalone: true,
  imports: [],
  templateUrl: './brand-section.component.html',
  styleUrl: './brand-section.component.scss'
})
export class BrandSectionComponent {

 @Input({required: true}) brandList: Brand[] = [];

  constructor() {}

  openBrandDetailsModal(brand : any){
    window.open(brand?.webLink)
  }
}
