import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
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

  constructor() {
    console.log(this.productsList);
  }

  protected readonly PLACEHOLDER_URL = 'assets/images/coming_soon.png';

  pageChangeHandler(event : any){
    console.log('function called')
    this.skip = (this.page - 1) * this.limit;
    const element = this.scrollContainer.nativeElement;
    console.log('element', element);
    window?.scrollTo({top:0,behavior: 'smooth'});

    // this.productsList = [...this.productsList]?.slice(this.skip);

  }

  addItemStartClickEvent(product: any){

  }
}
