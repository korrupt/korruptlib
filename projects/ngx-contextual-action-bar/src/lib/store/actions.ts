import { createAction, props } from '@ngrx/store';
import { ActionBarLayerModel } from "../model/action-bar-layer.model";

export const AddLayer    = createAction('[Dml-Navbar] Add layer', props<{layer: ActionBarLayerModel}>());
export const RemoveLayer = createAction('[Dml-Navbar] Remove layer', props<{id: string}>());

