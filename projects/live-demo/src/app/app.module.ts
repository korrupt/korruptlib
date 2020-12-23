import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ContextualActionBarModule } from "ngx-contextual-action-bar";
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";

const MATERIAL_MODULES = [
    MatIconModule,
    MatButtonModule,
    MatMenuModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    BrowserAnimationsModule,
    ContextualActionBarModule,
    // ...MATERIAL_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
