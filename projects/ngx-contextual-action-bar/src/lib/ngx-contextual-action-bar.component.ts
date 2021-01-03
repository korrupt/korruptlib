import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { combineLatest, fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged, map, pairwise, scan, startWith, switchMap } from "rxjs/operators";
import { ActionBarLayerModel, ActionBarLayerModes } from './model/action-bar-layer.model';
import { ContextualActionBarService } from './ngx-contextual-action-bar.service';
import { buttonAnimation } from './animations/button.animation';
import { navbarAnimation } from './animations/navbar.animation';
import { paddingAnimation } from './animations/padding.animations';
import { layerSwitchAnimation } from './animations/layer-switch.animation';

@Component({
  selector: 'ngx-contextual-action-bar',
  templateUrl: './ngx-contextual-action-bar.component.html',
  styleUrls: ['./ngx-contextual-action-bar.component.scss'],
  host: {
    'class': 'ngx-contextual-action-bar'
  },
  animations: [
    navbarAnimation,
    buttonAnimation,
    paddingAnimation,
    layerSwitchAnimation
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContextualActionBarComponent implements OnInit, OnDestroy {

  
  @ViewChild('c', { read: ElementRef, static: true }) content!: ElementRef<HTMLElement>;
  
  public netScroll$!: Observable<number>;
  public scroll!: Observable<number>;
  @Input() scrollThreshold: number = 200;
  
  layer$!: Observable<ActionBarLayerModel | undefined>;
  @Input() group: string = 'root';

  public navbarState$!: Observable<string>;
  public button$!: Observable<[string | undefined, string | undefined]>;
  public shadow$!: Observable<boolean>;
  public contentState$!: Observable<'none' | 'regular' | 'prominent'>;
  public layerSwitchTrigger$!: Observable<string | undefined>;


  constructor(
    private service: ContextualActionBarService
  ) {
  }

  handleButtonClick(id: string): void {
    this.service.buttonEmitter.emit(id);
  }

  ngOnInit(): void {
    this.layer$ = this.service.latest(this.group);
    this.layerSwitchTrigger$ = this.layer$.pipe(
      map(layer => layer?.id)
    )
    this.scroll = fromEvent(this.content.nativeElement, 'scroll').pipe(
      map(event => (event.target as HTMLElement).scrollTop),
      startWith(0)
    );
    this.netScroll$ = this.scroll.pipe(
      startWith(0),
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
      // distinctUntilChanged(([a, b]) => a === b || a === undefined)
    )

    this.navbarState$ = combineLatest([this.scroll, this.netScroll$, this.layer$]).pipe(
      scan((prev, [scroll, netscroll, layer]) => {
        // spaget 🍝
        if (layer?.background === 'transparent') return 'transparent';
        if (layer?.mode === ActionBarLayerModes.follow){
          if (prev === 'noanim') return 'fixed';
          return scroll > 1 ? 'visible' : 'nonaim';
        } else if (layer?.mode === ActionBarLayerModes.fixed) return 'fixed';
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
        if (layer?.mode === ActionBarLayerModes.follow) {
          return this.scroll.pipe(map(v => v > 1));
        } else if (layer?.background === 'transparent') {
          return of(false);
        }
        return this.navbarState$.pipe(map(v => v === 'visible'));
      })
    )

    this.contentState$ = this.layer$.pipe(
      map(layer => {
        if (!layer) return 'none';
        if (layer.background !== 'transparent') return 'none';
        return layer.prominent ? 'prominent' : 'regular';
      })
    )

  }

  ngOnDestroy(){
    
  }

}
