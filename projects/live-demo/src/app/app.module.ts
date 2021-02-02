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
import { CustomElementComponent } from './views/custom-element/custom-element.component';
import { SearchBarModule } from './shared/search-bar/search-bar.module';
import { MatInputModule } from '@angular/material/input';

const routes: Route[] = [
  { path: '', component: RootComponent },
  { path: 'transparent', component: TransparentComponent },
  { path: 'custom-element', component: CustomElementComponent }
]

const MATERIAL_MODULES = [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule,
    MatInputModule
]

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    TransparentComponent,
    CustomElementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContextualActionBarModule,
    ...MATERIAL_MODULES,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    SearchBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
