import { EventEmitter, Injectable } from '@angular/core';
import { ActionBarLayer, ActionBarLayerModel } from './model/action-bar-layer.model';

import * as uuidv4 from 'uuid';

import { Store } from '@ngrx/store';

import * as actions   from "./store/actions";
import { ActionBarLayerRegistration, ActionBarLayerToggleRegistration } from './layer-registration';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const DEFAULT_LAYER_OPTIONS: Partial<ActionBarLayerModel> = {
  title: '',
  image: false,
  group: 'root',
  actions: []
}

@Injectable({
  providedIn: 'root'
})
export class ContextualActionBarService {

  constructor(
    
  ) { }

  /**
   * Internal property, modify at own risk
   */
  public readonly _layers: BehaviorSubject<ActionBarLayerModel[]> = new BehaviorSubject<ActionBarLayerModel[]>([]);
  
  public latest(group: string = 'root'): Observable<ActionBarLayerModel> {
    return this._layers.asObservable().pipe(
      //filter by group
      map(layers => layers.filter(layer => layer.group === group)),
      //get latest layer
      map(layers => layers[layers.length - 1])
    );
  }

  /**
   * Internal function
   * @param id id of layer to remove
   */
  public _removeLayer(id: string): void {
    const { value } = this._layers;
    this._layers.next(value.filter(layer => layer.id !== id));
  }

  public _addLayer(layer: ActionBarLayerModel): void {
    const { value } = this._layers;
    this._layers.next([...value, layer]);
  }

  public buttonEmitter: EventEmitter<string> = new EventEmitter<string>();
  public actionEmitter: EventEmitter<[string, string]> = new EventEmitter<[string, string]>();

  private applyMissingProperties(layer: ActionBarLayer): ActionBarLayerModel {
    const id = uuidv4.v4();
    return Object.assign({...DEFAULT_LAYER_OPTIONS}, {id, ...layer}) as ActionBarLayerModel;
  }

  private validateLayer(layer: ActionBarLayer){
    return layer.background !== undefined &&
           layer.color !== undefined &&
           layer.button !== undefined &&
           layer.actions !== undefined
  }

  register(layerOptions: ActionBarLayer): ActionBarLayerRegistration {
    const layer = this.applyMissingProperties(layerOptions);
    if (this.validateLayer(layer)){
      return new ActionBarLayerRegistration(this, layer)
    } else {
      throw new Error('Please validate that you have filled all required properties in your layer')
    }
  }

  registerToggle(layer: ActionBarLayer, toggleLayer: ActionBarLayer): ActionBarLayerToggleRegistration {
    const _layer       = this.applyMissingProperties(layer);
    const _toggleLayer = this.applyMissingProperties(toggleLayer);
    if (this.validateLayer(_layer) && this.validateLayer(_toggleLayer)){
      return new ActionBarLayerToggleRegistration(this, _layer, _toggleLayer)
    } else {
      throw new Error('Please validate that you have filled all required properties in your layers');
    }
  }

}
