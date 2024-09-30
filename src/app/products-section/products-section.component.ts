import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Product} from "../type";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {NgIf, SlicePipe} from "@angular/common";
import {SearchEngineService} from "../search-engine.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [NgbPaginationModule, SlicePipe, NgIf],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.scss'
})
export class ProductsSectionComponent implements OnDestroy{
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  productsList: Product[] = [];

  //pagination data
  page: number = 1;
  limit: number = 25;
  skip = 0;
  productListLength: number = 0;

  productListSubscription: Subscription;

  constructor(public searchService : SearchEngineService) {
    this.productListSubscription = this.searchService.RESULT_PRODUCT_LIST.subscribe({
      next: (value: any) => {
        this.productsList = value;
        this.productListLength = this.productsList?.length;
      }
    })
  }

  protected readonly PLACEHOLDER_URL = 'assets/coming_soon.png';

  pageChangeHandler(event : any){
    this.skip = (this.page - 1) * this.limit;
    window?.scrollTo({top:0,behavior: 'smooth'});

  }

  redirectToProduct(productUrl: string | undefined){
    window.open(productUrl);
  }
  ngOnDestroy() {
    this.productListSubscription?.unsubscribe();
  }
}
