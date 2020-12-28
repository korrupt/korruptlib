import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, fromEvent, Observable, of, Subscription } from 'rxjs';
import { concatMap, distinctUntilChanged, map, mergeMap, pairwise, scan, startWith, switchMap, tap } from "rxjs/operators";
import { ActionBarLayerModel } from './model/action-bar-layer.model';
import { ContextualActionBarService } from './ngx-contextual-action-bar.service';
import { buttonAnimation } from './animations/button.animation';
import { ViewportRuler } from '@angular/cdk/overlay';
import { fixed } from './animations/fixed';

@Component({
  selector: 'ngx-contextual-action-bar',
  templateUrl: './ngx-contextual-action-bar.component.html',
  styleUrls: ['./ngx-contextual-action-bar.component.scss'],
  host: {
    'class': 'ngx-contextual-action-bar'
  },
  animations: [
    fixed,
    buttonAnimation
  ]
})
export class ContextualActionBarComponent implements OnInit, OnDestroy {

  
  @ViewChild('c', { read: ElementRef, static: true }) content!: ElementRef<HTMLElement>;
  
  public netScroll$!: Observable<number>;
  public scroll!: Observable<number>;
  @Input() scrollThreshold: number = 200;
  
  layer$!: Observable<ActionBarLayerModel | undefined>;
  @Input() group: string = 'root';

  private navbarHeight$!: Observable<number>;

  public fixed$!: Observable<string>;
  public nomargin$!: Observable<boolean | undefined>;
  public button$!: Observable<[string | undefined, string | undefined]>;

  constructor(
    private service: ContextualActionBarService,
    private vr: ViewportRuler
  ) {
  }

  handleButtonClick(id: string): void {
    this.service.buttonEmitter.emit(id);
  }

  ngOnInit(): void {
    this.layer$ = this.service.latest(this.group);
    this.navbarHeight$ = this.layer$.pipe(map(layer => layer?.prominent ? 128 : 56))
    this.scroll = fromEvent(this.content.nativeElement, 'scroll').pipe(
      map(event => (event.target as HTMLElement).scrollTop)
    );
    this.netScroll$ = this.scroll.pipe(
      pairwise(),
      scan((acc, cur) => {
        const [a, b] = cur;
        if (b > a){
          if (acc < 0) return 0;
        } else {
          if (acc > 0) return 0;
        }
        return acc + (b - a);
      }, 0),
    )
    this.button$ = this.layer$.pipe(
      map(layer => layer?.button),
      startWith(undefined),
      pairwise()
    )
    this.fixed$ = combineLatest([this.scroll, this.netScroll$, this.layer$]).pipe(
      scan((prev, [scroll, netscroll, layer]) => {
        if (prev === 'noanim') return scroll < (layer?.prominent ? 128 : 56) ? 'fixed' : 'hidden'
        else if (prev === 'fixed'){
          if (scroll < (layer?.prominent ? 128 : 56)) return 'fixed';
          return netscroll < -this.scrollThreshold ? 'visible' : 'fixed'
        } else {
          if (scroll < 1) return 'noanim';
          return netscroll < -this.scrollThreshold ? 'visible' : 'fixed'
        }
      }, 'fixed')
    )
    this.fixed$.subscribe(s => console.log(s))
  }

  ngOnDestroy(){
    
  }

}
