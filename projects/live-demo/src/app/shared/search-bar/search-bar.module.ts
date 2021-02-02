import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';

import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [
  MatInputModule,
  MatIconModule,
  MatButtonModule
];



@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    BrowserAnimationsModule
  ]
})
export class SearchBarModule { }
