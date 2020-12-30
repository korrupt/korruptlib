import { EventEmitter, Injectable } from '@angular/core';
import { ActionBarLayer, ActionBarLayerModel, ActionBarLayerModes } from './model/action-bar-layer.model';

import * as uuidv4 from 'uuid';
import { ActionBarLayerRegistration, ActionBarLayerToggleRegistration } from './layer-registration';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const DEFAULT_LAYER_OPTIONS: Partial<ActionBarLayerModel> = {
  title: '',
  group: 'root',
  actions: [],
  mode: ActionBarLayerModes.fixed,
  prominent: false
}

@Injectable({
  providedIn: 'root'
})
export class ContextualActionBarService {

  constructor(
    
  ) { }

  /**
   * 
   * Internal property, use at own risk.
   */
  public readonly _layers: BehaviorSubject<ActionBarLayerModel[]> = new BehaviorSubject<ActionBarLayerModel[]>([]);
  
  /**
   * Internal function used to retrieve most recent layer.
   * @param group - what group to target
   */
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
  /**
   * Internal function
   * @param layer - The layer to add
   */
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

  /**
   * Function to register a new layer. Returns a registration
   * @param layerOptions 
   */
  register(layerOptions: ActionBarLayer): ActionBarLayerRegistration {
    const layer = this.applyMissingProperties(layerOptions);
    if (this.validateLayer(layer)){
      return new ActionBarLayerRegistration(this, layer)
    } else {
      throw new Error('Please validate that you have filled all required properties in your layer')
    }
  }

  /**
   * Use at own risk, is set to be deprecated after next major version.
   * @param layer 
   * @param toggleLayer 
   */
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
