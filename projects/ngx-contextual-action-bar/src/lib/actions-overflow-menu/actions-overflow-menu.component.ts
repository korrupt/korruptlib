import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { ActionBarLayerAction } from '../model/action-bar-layer.model';

import * as selectors from '../store/selectors';
import xor from "arr-xor";
import { ContextualActionBarService } from '../ngx-contextual-action-bar.service';

const ICON_WIDTH = 40;

import { ActionAnimation } from "./animations/action.animation";

@Component({
  selector: 'ngx-actions-overflow-menu',
  templateUrl: './actions-overflow-menu.component.html',
  styleUrls: ['./actions-overflow-menu.component.scss'],
  animations: [
    ActionAnimation,
  ]
})
export class DmlActionsOverflowMenuComponent implements OnInit {

  @Input() group: string = 'root';
  @ViewChild('c', { read: ElementRef, static: true }) private c!: ElementRef<HTMLElement>;

  layer$!: Observable<{id: string, actions: ActionBarLayerAction[]}>;

  private _resizeEvent$ = fromEvent(window, 'resize').pipe(
    startWith(undefined),
    debounceTime(100)
  )

  private width!: Observable<number>;
  
  public visible$!: Observable<ActionBarLayerAction[]>;
  public menu$!:     Observable<ActionBarLayerAction[]>;

  constructor(
    private store: Store,
    private service: ContextualActionBarService
  ) {}

  handleActionClick(id: string, action: ActionBarLayerAction){
    this.service.actionEmitter.emit([id, action.icon])
  }

  ngOnInit(): void {
    this.layer$ = this.store.pipe(
      select(selectors.latest, {group: this.group}),
      map(layer => ({id: layer.id, actions: layer.actions}))
    )
    this.width = this._resizeEvent$.pipe(
      map(_ => this.c.nativeElement.getBoundingClientRect().width)
    )
    this.visible$ = combineLatest([this.width, this.layer$]).pipe(
      map(([width, layer]) => {
        if (!layer?.actions) return [];
        let max_visible = Math.floor(width / ICON_WIDTH) - 1;
        let visible = max_visible > layer.actions.length ? layer.actions.length : max_visible;
        if (visible + 1 == layer.actions.length) return layer.actions;
        return layer.actions.slice(0, visible)
      })
    )
    this.menu$ = combineLatest([this.visible$, this.layer$]).pipe(
      map(([visible, layer]) => {
        return xor(visible, layer.actions, (a: ActionBarLayerAction, b: ActionBarLayerAction) => {
          return a.icon === b.icon
        })
      })
    )    
  }


}
