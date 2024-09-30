import {Component, inject, Input, OnInit} from '@angular/core';
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
}
