import { ComponentType } from "@angular/cdk/portal";
import { Component } from "@angular/core";

export interface ActionBarLayerAction {
    /** What icon to display. You can find codes at {@link https://material.io/resources/icons/}. */
    icon: string;
    /** What text to display next to the icon, it the action bar is concatenated. */
    displayName: string;
}

export enum ActionBarLayerModes {
    /** Action bar acts as traditional content, and can be scrolled out of view. */
    fixed = 'fixed',
    /** Action bar follows the view, and always stays in place. */
    follow = 'follow',
    /** Action bar can be scrolled out of view, but will return when scrolled back. */
    mobile = 'mobile'
}

export interface ActionBarLayerModel {
    id: string;
    /** [Optional] The title of the navbar */
    title: string;
    /** [Optional] Which type of material icon to be used by the main button.*/
    button: string;
    /**  Background color of the navbar. Defaults to #FFF*/
    background: string | 'transparent';
    /** Icon and font color of the navbar. Defaults to #000 */
    color: string;
    /** Which navbar component instance to target. Defaults to 'root'. */
    group: string;
    /** [Optional] An array of actions to have attached to the layer. */
    actions: ActionBarLayerAction[];
    /** Whether the layer should be prominent. Should only be used on desktop layouts. */
    prominent: boolean;
    /** Will be overruled if background is set to 'transparent' */
    mode: ActionBarLayerModes;
    /** Add a custom element between the actions  */
    middleElement: ComponentType<any>;
}

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;

type Omitted = 'id' | 'customElementInstance'

export type ActionBarLayer = Omit<OptionalExceptFor<ActionBarLayerModel, 'color' | 'background'>, Omitted>

