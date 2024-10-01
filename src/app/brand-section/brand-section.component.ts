import {Component, contentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {brandList} from "../constants";
import {Brand, Product} from "../type";
import {I18nPluralPipe, NgClass, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchEngineService} from "../search-engine.service";

import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-brand-section',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    I18nPluralPipe,
    SkeletonModule,
    SkeletonModule
  ],
  templateUrl: './brand-section.component.html',
  styleUrl: './brand-section.component.scss'
})
export class BrandSectionComponent {


  searchKeyword : string = '';
  correctQuery: string = '';
  brandsLoader: boolean = false;
  invalidProducts: boolean = false;
  invalidBrands: boolean = false;
  brandsFetched: boolean = true;
  apiCallCount: number = 0;

  constructor(public searchService : SearchEngineService) {}

  /**
   * Event fired when you press Enter in search box
   * @param event
   * @param element
   */
  onEnterKeyInSearch(event: any, element: HTMLInputElement): void {
    if (event.keyCode === 13) {
      this.fetchProductAndBrands();
      element.blur();
    }
  }

  /**
   * clear event for search text
   * @param event
   */
  onSearchInputChange(event: any) {
    if (event == '') {
      // this.queryParams.search = undefined
      this.removeFilter();
    }
  }

  /**
   *
   */
  removeFilter(){
    this.searchKeyword = '';
  }


  openBrandDetailsModal(brand : any){
    window.open(brand?.webLink)
  }


  /**
   * search product based on query
   * @param query
   */
   onSearchProducts(query?: string) {
      // this.searchService.updateLoader(true);
      // this.searchService.updateLoaderText('Hang tight, we are fetching products for you....')
      const requestBody = {query : query ? query : this.searchKeyword};
        this.searchService.getSearchedProducts(requestBody).subscribe({
          next: (response: any) => {
            this.searchService.resultProductList = response.results;
            this.brandsFetched = true;
            this.invalidProducts = this.invalidProducts ? this.invalidProducts : response.corrected_query !== '' && !response.results;
            if(!query) {
              this.correctQuery = this.invalidProducts && !response.results ? response.corrected_query : '';
            }
            this.searchService.updateLoader(!this.brandsFetched);
            this.searchService.updateLoaderText('');
          },
          error: (err:any) => {
            console.log(err);
            this.searchService.updateLoader(!this.brandsFetched);
            this.searchService.updateLoaderText('');
          }
        })


  }

  /**
   * search brands based on query
   */
  onSearchBrands(query?: string){
      const requestBody = {query : query ? query : this.searchKeyword};

          this.searchService.getSearchedBrands(requestBody).subscribe({
            next: (response: any) => {
              this.searchService.resultBrandList = response.results;
              this.invalidBrands = this.invalidBrands ? this.invalidBrands :  response.corrected_query !== '' && !response.results;
              if(!query){
                this.correctQuery = this.invalidBrands && !response.results ? response.corrected_query : '';
              }
              // this.correctQuery = response.corrected_query;
              this.brandsFetched = true;
              this.searchService.updateLoader(!this.brandsFetched);
              this.searchService.updateLoaderText('');
              this.brandsLoader = false;
            },
            error: (err:any) => {
              console.log(err);
              this.searchService.updateLoader(!this.brandsFetched);
              this.searchService.updateLoaderText('');
              this.brandsLoader = false;
            }
          })

  }

  fetchProductAndBrands(loader: boolean = true, query?: string){
    this.apiCallCount += 1;
    this.brandsLoader = true;
    if(loader){
      this.searchService.updateLoader(loader);
      this.searchService.updateLoaderText('Hang tight, we are fetching products for you...');
    }
    this.onSearchBrands(query);
    this.onSearchProducts(query);

    setTimeout(()=> {
      this.searchPrompt();
    }, 3000);
  }

  //  async fetchBrandAndProducts(query?: string, ){
  //    this.apiCallCount += 1;
  //   const productRequest = this.searchService.getSearchedProducts({query : query ? query : this.searchKeyword});
  //   const brandRequest = this.searchService.getSearchedBrands({query : query ? query : this.searchKeyword});
  //   Promise.all([brandRequest, productRequest]).then(results => {
  //     const brandResponse = results[0];
  //     const productResponse = results[1];
  //     brandResponse.subscribe({
  //       next: (response: any) => {
  //         this.searchService.resultProductList = response.results;
  //         this.brandsFetched = true;
  //         this.invalidProducts = response.corrected_query !== '' && !response.results;
  //         if(this.invalidBrands) {
  //           this.correctQuery = this.invalidProducts && !response.results ? response.corrected_query : '';
  //         }
  //         this.searchService.updateLoader(!this.brandsFetched);
  //         this.searchService.updateLoaderText('');
  //       },
  //       error: (err:any) => {
  //         console.log(err);
  //         this.searchService.updateLoader(!this.brandsFetched);
  //         this.searchService.updateLoaderText('');
  //       }
  //     })
  //     productResponse.subscribe({
  //       next: (response: any) => {
  //         this.searchService.resultBrandList = response.results;
  //         this.invalidBrands = response.corrected_query !== '' && !response.results;
  //         if(this.invalidProducts){
  //           this.correctQuery = this.invalidBrands && !response.results ? response.corrected_query : '';
  //         }
  //         // this.correctQuery = response.corrected_query;
  //         this.brandsFetched = true;
  //         this.searchService.updateLoader(!this.brandsFetched);
  //         this.searchService.updateLoaderText('');
  //       },
  //       error: (err:any) => {
  //         console.log(err);
  //         this.searchService.updateLoader(!this.brandsFetched);
  //         this.searchService.updateLoaderText('');
  //       }
  //     })
  //     setTimeout(() => {
  //     },3000)
  //   })
  // }

  searchPrompt(){
    console.log('prompt called')
    if(this.invalidBrands && this.invalidProducts) {
      if(this.apiCallCount < 2) {
        this.apiCallCount += 1;
        console.log('function called');
        this.fetchProductAndBrands(false, this.correctQuery);
      } else {
        this.apiCallCount = 0;
      }
    }
  }

}
