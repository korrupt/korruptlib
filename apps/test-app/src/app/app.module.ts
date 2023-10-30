import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KngxNavbarModule } from 'kngx-navbar';
import { AppComponent } from './app.component';

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';
import { Route1Component, Route2Component, Route3Component } from './routes';

@NgModule({
  declarations: [AppComponent, Route1Component, Route2Component, Route3Component],
  imports: [BrowserModule, KngxNavbarModule, MatButtonModule, MatIconModule,
    RouterModule.forRoot([
      {
        path: '',
        component: Route1Component
      },
      {
        path: '2',
        component: Route2Component
      },
      {
        path: '3',
        component: Route3Component
      },
  ])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
