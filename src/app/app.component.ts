import {Component, inject, Input} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {BrandSectionComponent} from "./brand-section/brand-section.component";
import {ProductsSectionComponent} from "./products-section/products-section.component";
import {environment} from "../environments/environment";
import {catchError, map, Observable, take} from "rxjs";
import {Brand, Product} from "./type";
import {brandList, productList} from "./constants";
import {LoaderComponent} from "./loader/loader.component";
import {SearchEngineService} from "./search-engine.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BrandSectionComponent, ProductsSectionComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'searchEngine';
  loader = false;
  productsList: Product[] = productList;
  brandList: Brand[] = [] = brandList;

  constructor(public searchService: SearchEngineService) {}


  /**
   * search product based on query
   * @param query
   */
  onSearchProducts(query: string) {
    if (!this.loader) {
      this.searchService.updateLoader(true);
      this.searchService.updateLoaderText('Hang tight, we are fetching products for you....')
      const requestBody = {query};
      this.loader = true;
      this.searchService.getSearchedProducts(requestBody).subscribe({
        next: (response) => {
          this.productsList = response.results;
          // this.brandList = response?.brands;
          this.loader = false;
          this.searchService.updateLoader(false);
          this.searchService.updateLoaderText('');

        },
        error: (err) => {
          this.loader = false;
          console.log(err);
          this.searchService.updateLoader(false);
          this.searchService.updateLoaderText('');
        }
      })
    }
  }


}
