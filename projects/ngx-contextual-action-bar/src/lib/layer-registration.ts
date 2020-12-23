import { ContextualActionBarService } from './ngx-contextual-action-bar.service';

import * as actions from './store/actions';
import { Observable } from 'rxjs';
import { filter, map, mapTo } from 'rxjs/operators';
import { ActionBarLayerModel } from './model/action-bar-layer.model';

export class ActionBarLayerRegistration {
    constructor(
        private service: ContextualActionBarService,
        private readonly _layer: ActionBarLayerModel,
    ){
        this.service.store.dispatch(actions.AddLayer({layer: _layer}));
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

    unregister(){
        const id = this._layer.id;
        this.service.store.dispatch(actions.RemoveLayer({id}));
    }
}

export class ActionBarLayerToggleRegistration {
    private toggled = false;

    constructor(
        private service: ContextualActionBarService,
        private _layer: ActionBarLayerModel,
        private _toggleLayer: ActionBarLayerModel
    ) {
        this.service.store.dispatch(actions.AddLayer({layer: _layer}));
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
            this.service.store.dispatch(actions.AddLayer({layer: this._toggleLayer}))
        else
            this.service.store.dispatch(actions.RemoveLayer({id: this._toggleLayer.id}))
        this.toggled = !this.toggled;
    }

    public unregister(): void {
        this.service.store.dispatch(actions.RemoveLayer({id: this._layer.id}));
        this.service.store.dispatch(actions.RemoveLayer({id: this._toggleLayer.id}));
    }
}
