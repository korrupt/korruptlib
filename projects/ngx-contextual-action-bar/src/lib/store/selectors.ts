
// import { adapter } from "./reducer";

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionBarLayerModel } from '../model/action-bar-layer.model';
import { featureKey, State } from "./reducer";

const featureSelector = createFeatureSelector<State>(featureKey);

export const latest = createSelector(
    featureSelector,
    (state: State, props: { group: string }) => {
        const entities = (Object.values(state.entities) as ActionBarLayerModel[]).filter(e => e.group === props.group)
        // const idx = state.ids[state.ids.length - 1];
        return entities[entities.length - 1]
    }
)