import { KngxNavbarLayer } from ".";

export type KngxNavbarLayerButtonEvent = {
  id: number;
  type: 'BUTTON';
};

export type KngxNavbarLayerActionEvent<T> = {
  id: number;
  type: 'ACTION';
  action: ExtractActions<T>;
}

export type ExtractActions<T> = T extends KngxNavbarLayer ? T['actions'] extends Array<{ action: infer U }> ? U : never : never;

export type KngxNavbarLayerEvent<T> = KngxNavbarLayerButtonEvent | KngxNavbarLayerActionEvent<T>;
