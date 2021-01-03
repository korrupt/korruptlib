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
import { MatRippleModule } from '@angular/material/core';
import { Route, RouterModule } from '@angular/router';
import { RootComponent } from './views/root/root.component';
import { TransparentComponent } from './views/transparent/transparent.component';

const routes: Route[] = [
  { path: '', component: RootComponent },
  { path: 'transparent', component: TransparentComponent }
]

const MATERIAL_MODULES = [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule
]

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    TransparentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContextualActionBarModule,
    ...MATERIAL_MODULES,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
