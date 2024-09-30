import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // @Output() seacrhItem = new EventEmitter<any>();
  //
  // searchKeyword : string = ''
  //
  //
  // /**
  //  * Event fired when you press Enter in search box
  //  * @param event
  //  * @param element
  //  */
  // onEnterKeyInSearch(event: any, element: HTMLInputElement): void {
  //   if (event.keyCode === 13) {
  //     this.searchByKeyword();
  //     element.blur();
  //   }
  // }
  //
  // /**
  //  * clear event for search text
  //  * @param event
  //  */
  // onSearchInputChange(event: any) {
  //   if (event == '') {
  //     // this.queryParams.search = undefined
  //     this.removeFilter(event)
  //   }
  // }
  //
  // /**
  //  *
  //  */
  // removeFilter(event: any){
  //   this.searchKeyword = '';
  // }
  //
  //
  // /**
  //  *
  //  */
  // searchByKeyword(): void {
  //   this.seacrhItem.emit(this.searchKeyword);
  //   this.searchKeyword = '';
  // }
}
