import {Component, Input} from '@angular/core';
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

  constructor() {
    console.log(brandList[0]);
  }

  openBrandDetailsModal(brand : any){
    console.log(brand?.webLink)
    window.open(brand?.webLink)
  }
}
