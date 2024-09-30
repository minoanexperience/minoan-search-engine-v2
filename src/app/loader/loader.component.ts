import { Component } from '@angular/core';
import {SearchEngineService} from "../search-engine.service";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loaderText: string = '';

  showLoader: boolean = false

  constructor(
    public searchService: SearchEngineService,
  ) { }

  ngOnInit(): void {
    this.searchService.showLoader.subscribe({
      next: (value: boolean) => {
        this.showLoader = value;
      }
    })

    this.searchService.showLoaderText.subscribe({
      next: (value: string) => {
        this.loaderText = value;
      }
    })
  }
}
