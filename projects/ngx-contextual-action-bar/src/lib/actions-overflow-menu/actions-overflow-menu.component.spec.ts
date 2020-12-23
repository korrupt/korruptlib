import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../store/reducer';

import { DmlActionsOverflowMenuComponent } from './actions-overflow-menu.component';
import * as selectors from '../store/selectors'
import { fakeSchedulers } from 'rxjs-marbles/jasmine/angular';
import { By } from '@angular/platform-browser';
import { ActionBarLayerModel } from '../model/action-bar-layer.model';

describe('DmlActionsOverflowMenuComponent', () => {
  let component: DmlActionsOverflowMenuComponent;
  let fixture: ComponentFixture<DmlActionsOverflowMenuComponent>;
  let store: MockStore;
  const initialState: State = { entities: {}, ids: [] }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmlActionsOverflowMenuComponent ],
      imports: [
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {selector: selectors.latest, value: {id: '123', actions: []}}
          ]
        })
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmlActionsOverflowMenuComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should spawn a wrapper', () => {
    expect(component['c']).toBeDefined()
  })

  it('resize should run once, regardless of resize event', fakeSchedulers(() => {
    let received: any;
    component['_resizeEvent$'].subscribe(s => received = true);
    expect(received).not.toBeDefined()
    tick(100)    
    expect(received).toBeTrue()
  }))

  it('should react to resize events', fakeSchedulers(() => {
    let received: number = 0;
    component['width'].subscribe(s => received++);
    expect(received).toBe(0)
    tick(100);
    // initial run caused by startWith(undefined)
    expect(received).toBe(1);
    tick(100);
    expect(received).toBe(1);
    
    window.dispatchEvent(new Event('resize'))
    tick(100);
    expect(received).toBe(2);
  }))

  it('should display all actions if given space', fakeSchedulers(() => {
    let buttons: number | undefined;
    component.visible$.subscribe(s => buttons = s.length);
    expect(buttons).not.toBeDefined();
    // set width
    (<HTMLElement>fixture.debugElement.nativeElement).style.display = 'flex';
    (<HTMLElement>fixture.debugElement.nativeElement).style.position = 'relative';
    (<HTMLElement>fixture.debugElement.nativeElement).style.width = '2000px';
    
    const testLayer: ActionBarLayerModel = { id: '123', title: 'test', image: false, button: 'menu', background: '', color: '', group: 'root', actions: [
      { icon: 'a', displayName: 'Share this page' },
      { icon: 'b', displayName: 'Share this page' },
      { icon: 'c', displayName: 'Share this page' },
      { icon: 'd', displayName: 'Share this page' },
    ]};
    
    store.overrideSelector(selectors.latest, testLayer);
    store.refreshState()
    tick(100)
    
    expect(buttons).toBe(testLayer.actions.length);
  }))

  it('should available actions per given space', fakeSchedulers(() => {
    let buttons: number | undefined;
    const button_width = 40;
    const width = 3 * button_width;
    component.visible$.subscribe(s => buttons = s.length);
    expect(buttons).not.toBeDefined();
    // set width
    (<HTMLElement>fixture.debugElement.nativeElement).style.display = 'flex';
    (<HTMLElement>fixture.debugElement.nativeElement).style.position = 'relative';
    (<HTMLElement>fixture.debugElement.nativeElement).style.width = `${width}px`;
    
    const testLayer: ActionBarLayerModel = { id: '123', title: 'test', image: false, button: 'menu', background: '', color: '', group: 'root', actions: [
      { icon: 'a', displayName: 'Share this page' },
      { icon: 'b', displayName: 'Share this page' },
      { icon: 'c', displayName: 'Share this page' },
      { icon: 'c', displayName: 'Share this page' },
      { icon: 'c', displayName: 'Share this page' },
      { icon: 'c', displayName: 'Share this page' },
      { icon: 'c', displayName: 'Share this page' },
    ]};
    
    store.overrideSelector(selectors.latest, testLayer);
    store.refreshState()
    tick(100)
    
    expect(buttons).toBe(
      Math.floor(width / button_width) - 1 ||
      testLayer.actions.length
    );
  }))

  it('should overflow if not given enough space', fakeSchedulers(() => {
    let visible: number | undefined;
    let menu: number | undefined;
    let w: number | undefined;

    component['visible$'].subscribe(s => visible = s.length);
    component['menu$'].subscribe(s => menu = s.length);
    component['width'].subscribe(s => w = s);
    tick(100);
    expect(visible).toBe(0);
    expect(menu).toBe(0);
    const width = 1000;

    // set width
    (<HTMLElement>fixture.debugElement.nativeElement).style.display = 'flex';
    (<HTMLElement>fixture.debugElement.nativeElement).style.position = 'relative';
    (<HTMLElement>fixture.debugElement.nativeElement).style.width = `${width}px`;
    
    const testLayer: ActionBarLayerModel = { id: '123', title: 'test', image: false, button: 'menu', background: '', color: '', group: 'root', actions: [
      { icon: 'a', displayName: 'Share this page' },
      { icon: 'b', displayName: 'Share this page' },
      { icon: 'c', displayName: 'Share this page' },
      { icon: 'd', displayName: 'Share this page' },
      { icon: 'e', displayName: 'Share this page' },
      { icon: 'f', displayName: 'Share this page' },
      { icon: 'g', displayName: 'Share this page' },
    ]};
    
    store.overrideSelector(selectors.latest, testLayer);
    store.refreshState()
    tick(100)
    expect(visible).toBe(testLayer.actions.length);

    (<HTMLElement>fixture.debugElement.nativeElement).style.width = '160px';
    window.dispatchEvent(new Event('resize'));

    tick(100);
    expect(visible).toBe(3);
    expect(menu).toBe(testLayer.actions.length - 3);   
  }))
});
