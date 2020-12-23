import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextualActionBarComponent } from './ngx-contextual-action-bar.component';
import { StoreModule } from '@ngrx/store';

import { featureKey, reducer } from "./store/reducer";
import { ContextualActionBarService } from './ngx-contextual-action-bar.service';

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

import { ScrollhandlerDirective } from './ngx-scrollhandler.directive';
import { DmlActionsOverflowMenuComponent } from './actions-overflow-menu/actions-overflow-menu.component';

const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule
]

@NgModule({
  declarations: [
    ContextualActionBarComponent,
    ScrollhandlerDirective,
    DmlActionsOverflowMenuComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    ...MATERIAL_MODULES
  ],
  exports: [
    ContextualActionBarComponent
  ],
  providers: [
    ContextualActionBarService
  ]
})
export class ContextualActionBarModule { }
