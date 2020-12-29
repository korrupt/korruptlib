import { ContextualActionBarService } from './ngx-contextual-action-bar.service';

import { Observable } from 'rxjs';
import { filter, map, mapTo } from 'rxjs/operators';
import { ActionBarLayerModel, ActionBarLayer } from './model/action-bar-layer.model';

export class ActionBarLayerRegistration {
    constructor(
        private service: ContextualActionBarService,
        private _layer: ActionBarLayerModel,
    ){
        this.service._addLayer(_layer);
    }

    public get onButtonClick(): Observable<void> {
        return this.service.buttonEmitter.pipe(filter(id => id === this._layer.id), mapTo(undefined))
    }

    public get onActionClick(): Observable<string> {
        return this.service.actionEmitter.pipe(
            filter(([id, action]) => id === this._layer.id),
            map(([id, action]) => action)
        )
    }

    public get layer(): ActionBarLayerModel {
        return this._layer;
    }

    /**
     * 
     * @param layer Object containing properties to update
     */
    setLayer(layer: Partial<ActionBarLayer>){
        const value = this.service._layers.value;
        const idx = value.findIndex(e => e.id === this.layer.id);
        if (idx > -1){
            value[idx] = Object.assign(value[idx], layer);
            this.service._layers.next(value);
            this._layer = value[idx];
        }
    }

    unregister(){
        const id = this._layer.id;
        this.service._removeLayer(id);
    }
}

export class ActionBarLayerToggleRegistration {
    private toggled = false;

    constructor(
        private service: ContextualActionBarService,
        private _layer: ActionBarLayerModel,
        private _toggleLayer: ActionBarLayerModel
    ) {
        this.service._addLayer(_layer)
    }

    public get onButtonClick(): Observable<number> {
        return this.service.buttonEmitter.pipe(
            filter(id => {
                return id === this._layer.id || id === this._toggleLayer.id
            }),
            map(id => {
                return id === this._layer.id ? 0 : 1
            })
        )
    }

    public get onActionClick(): Observable<[number, string]> {
        return this.service.actionEmitter.pipe(
            filter(([id, action]) => {
                return id === this._layer.id || id === this._toggleLayer.id
            }),
            map(([id, action]) => {
                return [id === this._layer.id ? 0 : 1, action]
            })
        )
    }

    public toggleLayer(): void {
        if (!this.toggled)
            this.service._addLayer(this._toggleLayer);
        else
            this.service._removeLayer(this._toggleLayer.id)
        this.toggled = !this.toggled;
    }

    public unregister(): void {
        this.service._removeLayer(this._layer.id);
        this.service._removeLayer(this._toggleLayer.id);
    }
}
