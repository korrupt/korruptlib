import { TestBed } from '@angular/core/testing';

import { ContextualActionBarService } from './ngx-contextual-action-bar.service';

import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ActionBarLayer } from './model/action-bar-layer.model';
import { ActionBarLayerRegistration, ActionBarLayerToggleRegistration } from './layer-registration';

describe('DmlNavbarService', () => {
  let service: ContextualActionBarService; 
  let store: MockStore;
  const initialState = { navbar: { entities: [], ids: [] } };

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState
        }),
      ]
    });
    service = TestBed.inject(ContextualActionBarService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[register()] should return a NavbarLayerRegistration', () => {
    const testLayer: ActionBarLayer = {title: 'test', button: 'menu', background: 'red', color: 'white', group: 'root', image: false };
    const output = service.register(testLayer);
    expect(output).toBeInstanceOf(ActionBarLayerRegistration)
  })

  it('[applyMissingProperties()] should fill inn blank values', () => {
    const testLayer: ActionBarLayer = {button: 'menu', background: 'red', color: 'white', group: 'root', image: false,  };
    const layer = service['applyMissingProperties'](testLayer);
    expect(layer.title).toEqual('')
    expect(layer.image).toBe(false)
    expect(layer.group).toEqual('root')
  })

  it('[registerToggle()] should return a NavbarLayerToggleRegistration', () => {
    const testLayer1: ActionBarLayer = {title: 'test1', button: 'menu', background: 'red', color: 'white', group: 'root', image: false };
    const testLayer2: ActionBarLayer = {title: 'test2', button: 'menu', background: 'red', color: 'white', group: 'root', image: false };
    const output = service.registerToggle(testLayer1, testLayer2);
    expect(output).toBeInstanceOf(ActionBarLayerToggleRegistration)
  })

});
