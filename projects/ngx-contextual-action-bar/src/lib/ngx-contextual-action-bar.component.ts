import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, pairwise, startWith } from "rxjs/operators";
import { ActionBarLayerModel } from './model/action-bar-layer.model';

import { latest } from "./store/selectors";
import { ContextualActionBarService } from './ngx-contextual-action-bar.service';

import { fixedInView } from './animations/fixed-in-view.animation';
import { ScrollhandlerDirective } from './ngx-scrollhandler.directive';
import { buttonAnimation } from './animations/button.animation';

@Component({
  selector: 'ngx-contextual-action-bar',
  templateUrl: './ngx-contextual-action-bar.component.html',
  styleUrls: ['./ngx-contextual-action-bar.component.scss'],
  host: {
    'class': 'ngx-contextual-action-bar'
  },
  animations: [
    fixedInView,
    buttonAnimation
  ]
})
export class ContextualActionBarComponent implements OnInit, OnDestroy {

  layer$: Observable<ActionBarLayerModel | undefined> = of(undefined);

  @ViewChild(ScrollhandlerDirective, {static: true}) private scroll!: ScrollhandlerDirective;

  @Input() group: string = 'root';
  @Input() scrollThreshold: number = 200;

  public fixed$!: Observable<boolean>;
  public nomargin$!: Observable<boolean | undefined>;
  public button$!: Observable<[string, string]>;

  constructor(
    // private store: Store,
    private service: ContextualActionBarService
  ) {
    
  }

  handleButtonClick(id: string): void {
    this.service.buttonEmitter.emit(id);
  }

  ngOnInit(): void {
    this.layer$ = this.service.latest(this.group);
    this.nomargin$ = this.layer$.pipe(map(e => e?.image));
    this.button$ = this.layer$.pipe(
      startWith(undefined),
      map(e => e?.button as string), pairwise(), distinctUntilChanged((x, y) => x == y)
    );

    this.fixed$ = combineLatest([this.scroll.scrolled$, this.nomargin$]).pipe(
      map(([e, image]) => {
        if (image) return false;
        return e < -this.scrollThreshold
      })
    )
  }

  ngOnDestroy(){
    
  }

}
