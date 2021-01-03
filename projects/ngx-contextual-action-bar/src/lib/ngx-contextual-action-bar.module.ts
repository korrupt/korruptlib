import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";

import { ContextualActionBarComponent } from './ngx-contextual-action-bar.component';
import { ContextualActionBarService } from './ngx-contextual-action-bar.service';
import { ScrollhandlerDirective } from './ngx-scrollhandler.directive';
import { DmlActionsOverflowMenuComponent } from './actions-overflow-menu/actions-overflow-menu.component';

const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatDividerModule
]

@NgModule({
  declarations: [
    ContextualActionBarComponent,
    ScrollhandlerDirective,
    DmlActionsOverflowMenuComponent
  ],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    ContextualActionBarComponent,
  ],
  providers: [
    ContextualActionBarService,
  ]
})
export class ContextualActionBarModule { }
