import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {brandList} from "../constants";
import {Brand, Product} from "../type";
import {I18nPluralPipe, NgClass, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchEngineService} from "../search-engine.service";

@Component({
  selector: 'app-brand-section',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    I18nPluralPipe
  ],
  templateUrl: './brand-section.component.html',
  styleUrl: './brand-section.component.scss'
})
export class BrandSectionComponent {


  searchKeyword : string = '';
  correctQuery: string = '';
  loader: boolean = false;

  constructor(public searchService : SearchEngineService) {}

  /**
   * Event fired when you press Enter in search box
   * @param event
   * @param element
   */
  onEnterKeyInSearch(event: any, element: HTMLInputElement): void {
    if (event.keyCode === 13) {
      this.onSearchProducts();
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
  onSearchProducts() {
    if (!this.loader) {
      this.searchService.updateLoader(true);
      this.searchService.updateLoaderText('Hang tight, we are fetching products for you....')
      const requestBody = {query : this.searchKeyword};
      this.loader = true;
      this.searchService.getSearchedProducts(requestBody).subscribe({
        next: (response: any) => {
          this.searchService.resultProductList = response.results;
          this.searchService.resultBrandList = response?.brands ? response.brandList : brandList;
          this.correctQuery = response?.corrected_query;
          this.loader = false;
          this.searchService.updateLoader(false);
          this.searchService.updateLoaderText('');

        },
        error: (err:any) => {
          this.loader = false;
          console.log(err);
          this.searchService.updateLoader(false);
          this.searchService.updateLoaderText('');
        }
      })
    }
  }
}
