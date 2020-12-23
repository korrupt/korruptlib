export interface ActionBarLayerAction {
    icon: string;
    displayName: string;
}

export interface ActionBarLayerModel {
    id: string;
    title: string;
    button: string;
    background: string;
    color: string;
    group: string;
    image: boolean;
    actions: ActionBarLayerAction[];
    // position: 'adaptive' | 'fixed';
}

interface OPTIONAL {
    id: string;
    title?: string;
    image?: boolean;
    group?: string;
    actions?: ActionBarLayerAction[];
    // position?: 'adaptive' | 'fixed';
}

export type ActionBarLayer = Omit<ActionBarLayerModel, keyof OPTIONAL> & Omit<OPTIONAL, 'id'>
