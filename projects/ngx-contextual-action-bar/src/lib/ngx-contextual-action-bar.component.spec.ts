import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DmlActionsOverflowMenuComponent } from './actions-overflow-menu/actions-overflow-menu.component';

import { ContextualActionBarComponent } from './ngx-contextual-action-bar.component';
import { ContextualActionBarService } from './ngx-contextual-action-bar.service';
import { ScrollhandlerDirective } from './ngx-scrollhandler.directive';
import { ActionBarLayerModel } from './model/action-bar-layer.model';

import { State } from "./store/reducer";

import * as selectors from './store/selectors'

const MockService = {
  
}

describe('DmlNavbarComponent', () => {
  let component: ContextualActionBarComponent;
  let fixture: ComponentFixture<ContextualActionBarComponent>;
  let store: MockStore<State>;
  let mockLatestSelector;
  let mockService: ContextualActionBarService;

  const initialState: { navbar: State } = {navbar: {entities: {}, ids: []}};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule
      ],
      declarations: [ ContextualActionBarComponent, ScrollhandlerDirective, DmlActionsOverflowMenuComponent ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {selector: selectors.latest, value: {entities: {}, ids: []}}
          ]
        }),
        { provide: ContextualActionBarService, useValue: MockService }
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextualActionBarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start empty', () => {
    fixture.detectChanges()
    const navbar = fixture.debugElement.query(By.css('.navbar'));
    expect(navbar).toBeNull()
  })
  
  it('should render a layer', () => {
    const testLayer: ActionBarLayerModel = { id: '123', title: 'Test', background: 'black', color: 'white', button: 'menu', group: 'random', image: false, actions: [] };
    store.overrideSelector(selectors.latest, testLayer);
    fixture.detectChanges()
    const navbar = fixture.debugElement.query(By.css('.navbar'));    
    expect(navbar).not.toBeNull()
  })

  it('should render the correct title', () => {
    const testLayer: ActionBarLayerModel = { id: '123', title: 'Test', background: 'black', color: 'white', button: 'menu', group: 'random', image: false, actions: [] };
    store.overrideSelector(selectors.latest, testLayer);
    fixture.detectChanges()
    const title = fixture.debugElement.query(By.css('.title'));
    expect(title.nativeElement.innerHTML).toEqual('Test')
  })

  it('should render the correct button', () => {
    const testLayer: ActionBarLayerModel = { id: '123', title: 'Test', background: 'black', color: 'white', button: 'menu', group: 'random', image: false, actions: [] };
    store.overrideSelector(selectors.latest, testLayer);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'))
    expect(button).toBeDefined()
    const icon = button.query(By.css('.new'))
    expect(icon.nativeElement.innerHTML).toEqual(testLayer.button)
  })

});
