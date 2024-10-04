import {Component} from '@angular/core';
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
  // brandsLoader: boolean = false;
  invalidProducts: boolean = false;
  // invalidBrands: boolean = false;
  brandsFetched: boolean = true;
  apiCallCount: number = 0;
  isSpellingMistake: boolean = false;

  constructor(public searchService : SearchEngineService) {}

  /**
   * Event fired when you press Enter in search box
   * @param event
   * @param element
   */
  onEnterKeyInSearch(event: any, element: HTMLInputElement): void {
    if (event.keyCode === 13) {
      this.fetchProductAndBrands(true);
      element?.blur();
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
  removeFilter(event?: HTMLElement){
    event?.blur();
    this.searchKeyword = '';
  }


  openBrandDetailsModal(brand : any){
    window.open(brand?.webLink)
  }

  /**
   * fetch brands and product for search query
   * @param searchCall
   * @param event
   */
  async fetchProductAndBrands(searchCall: boolean = true, event?: HTMLElement){
    // this.brandsLoader = true;
    event?.blur();
    if(searchCall){
      this.searchService.updateLoader(searchCall);
      this.searchService.updateLoaderText('Hang tight, we are fetching products for you...');
    }
    // this.onSearchBrands(query);
    console.log('call no :', this.apiCallCount , 'with searchCall : ', searchCall);
    await this.onSearchProducts(searchCall)

    if(this.invalidProducts){
      this.searchPrompt();
    }
    // setTimeout(()=> {
    //   console.log('inside timeout')
    //   if(this.invalidProducts) {
    //     console.log('prompt called');
    //     this.searchPrompt();
    //   }
    // }, 3000);
  }

  /**
   * search products based on query
   * @param searchCall
   */
  async onSearchProducts(searchCall: boolean) {
    console.log('searchCall: ', searchCall);
    console.log('Before call : ');
    console.log('invalid products : ', this.invalidProducts);
    console.log('corrected query : ', this.correctQuery);

    const requestBody = {query: searchCall ? this.searchKeyword : this.correctQuery};
    await new  Promise(resolve => {
      this.searchService.getSearchedProducts(requestBody).subscribe({
        next: (response: any) => {
          this.searchService.resultProductList = response.results;
          this.brandsFetched = true;
          this.invalidProducts = searchCall ? !response.results && response.corrected_query !== '' : this.invalidProducts;
          this.correctQuery = searchCall ? response.corrected_query : this.correctQuery;
          this.isSpellingMistake = !this.invalidProducts && this.correctQuery !== ''
          console.log('After call : ');
          console.log('invalid products : ', this.invalidProducts);
          console.log('corrected query : ', this.correctQuery);
          this.searchService.updateLoader(!this.brandsFetched);
          this.searchService.updateLoaderText('');
          this.searchService.promptLoader = false;
          return resolve(true);
        },
        error: (err: any) => {
          console.log(err);
          this.searchService.updateLoader(!this.brandsFetched);
          this.searchService.updateLoaderText('');
          this.searchService.promptLoader = false;
          return resolve(true);
        }
      })
    })
  }
  get correctedQuery(){
    if(this.isSpellingMistake){
      return `${this.correctQuery}?`;
    } else {
      return this.correctQuery;
    }
  }

  /**
   * search brands based on query
   */
  // onSearchBrands(query?: string){
  //     const requestBody = {query : query ? query : this.searchKeyword};
  //
  //         this.searchService.getSearchedBrands(requestBody).subscribe({
  //           next: (response: any) => {
  //             this.searchService.resultBrandList = response.results;
  //             this.invalidBrands = this.invalidBrands ? this.invalidBrands :  response.corrected_query !== '' && !response.results;
  //             if(!query){
  //               this.correctQuery = this.invalidBrands && !response.results ? response.corrected_query : '';
  //             }
  //             // this.correctQuery = response.corrected_query;
  //             this.brandsFetched = true;
  //             this.searchService.updateLoader(!this.brandsFetched);
  //             this.searchService.updateLoaderText('');
  //             this.brandsLoader = false;
  //           },
  //           error: (err:any) => {
  //             console.log(err);
  //             this.searchService.updateLoader(!this.brandsFetched);
  //             this.searchService.updateLoaderText('');
  //             this.brandsLoader = false;
  //           }
  //         })
  //
  // }


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

  /**
   * search for prompt if onSearchProduct doesn't give results
   */
  searchPrompt(){
    this.apiCallCount += 1;
    if(this.apiCallCount < 2) {
        this.searchService.promptLoader = true;
        this.fetchProductAndBrands(false);
      } else {
        this.apiCallCount = 0;
      }
  }

}
