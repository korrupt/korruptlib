import { ActionBarLayerModel } from "../model/action-bar-layer.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './actions';

export const featureKey = 'ngx-contextual-action-bar';

export interface State extends EntityState<ActionBarLayerModel> {}

export const adapter: EntityAdapter<ActionBarLayerModel> = createEntityAdapter<ActionBarLayerModel>()

export const initialState = adapter.getInitialState()

const navbarReducer = createReducer(
    initialState,
    on(actions.AddLayer, (state, {layer}) => adapter.addOne(layer, state)),
    on(actions.RemoveLayer, (state, {id}) => adapter.removeOne(id, state)),
);

export function reducer(state: State, action: Action){
    return navbarReducer(state, action);
}