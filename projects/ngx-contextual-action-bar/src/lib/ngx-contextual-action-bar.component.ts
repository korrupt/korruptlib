import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { distinctUntilChanged, map, pairwise, scan, startWith, switchMap } from "rxjs/operators";
import { ActionBarLayerModel } from './model/action-bar-layer.model';
import { ContextualActionBarService } from './ngx-contextual-action-bar.service';
import { buttonAnimation } from './animations/button.animation';
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

  public fixed$!: Observable<string>;
  public button$!: Observable<[string | undefined, string | undefined]>;
  public shadow$!: Observable<boolean>;


  constructor(
    private service: ContextualActionBarService
  ) {
  }

  handleButtonClick(id: string): void {
    this.service.buttonEmitter.emit(id);
  }

  ngOnInit(): void {
    this.layer$ = this.service.latest(this.group);
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
      pairwise(),
      distinctUntilChanged(([a, b]) => a === b || a === undefined)
    )

    this.button$.subscribe(s => console.log(s))
    this.fixed$ = combineLatest([this.scroll, this.netScroll$, this.layer$]).pipe(
      scan((prev, [scroll, netscroll, layer]) => {
        // spaget 🍝
        if (layer?.mode === 'follow'){
          if (prev === 'noanim') return 'fixed';
          return scroll > 1 ? 'visible' : 'nonaim';
        } else if (layer?.mode === 'fixed') return 'fixed';
        else {
          if (prev === 'noanim') return 'fixed';
          else if (prev === 'fixed'){
            if (scroll < (layer?.prominent ? 128 : 56)) return 'fixed';
          } else {
            if (scroll < 1) return 'noanim';
          }
          return netscroll < -this.scrollThreshold ? 'visible' : 'fixed'
        }
      }, 'fixed')
    )

    this.shadow$ = this.layer$.pipe(
      switchMap(layer => {
        if (layer?.mode === 'follow') {
          return this.scroll.pipe(map(v => v > 1));
        }
        return this.fixed$.pipe(map(v => v === 'visible'));
      })
    )
  }

  ngOnDestroy(){
    
  }

}
