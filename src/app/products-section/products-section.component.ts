import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Product} from "../type";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {SlicePipe} from "@angular/common";

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [NgbPaginationModule, SlicePipe],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.scss'
})
export class ProductsSectionComponent implements OnChanges{
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Input({required : true}) productsList!: Product[];

  //pagination data
  page: number = 1;
  limit: number = 25;
  skip = 0;
  productListLength: number = this.productsList?.length;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['productsList']) {
      this.productListLength = this.productsList?.length;
    }
  }

  constructor() {}

  protected readonly PLACEHOLDER_URL = 'assets/images/coming_soon.png';

  pageChangeHandler(event : any){
    this.skip = (this.page - 1) * this.limit;
    window?.scrollTo({top:0,behavior: 'smooth'});

  }

  redirectToProduct(productUrl: string | undefined){
    window.open(productUrl);
  }
}
