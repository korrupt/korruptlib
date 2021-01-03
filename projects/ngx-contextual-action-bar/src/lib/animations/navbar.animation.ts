import { animate, state, style, transition, trigger } from "@angular/animations";

import * as easings from '../material/easings';
import * as timings from '../material/timings';

export const navbarAnimation = trigger('navbar', [
    state('transparent', style({ position: 'absolute' })),
    state('fixed',    style({ position: 'relative' })),
    state('visible',  style({ position: 'sticky' })),
    transition('fixed => visible', [
        style({ position: 'sticky', transform: 'translateY(-100%)' }),
        animate(`${timings.medium_enter} ${easings.decelerated}`, style({ transform: 'translateY(0%)' })),
    ]),
    transition('visible => fixed', [
        style({ position: 'sticky', transform: 'translateY(0%)' }),
        animate(`${timings.medium_leave} ${easings.accelerated}`, style({ transform: 'translateY(-100%)' })),
        style({ position: 'relative' })
    ]),
    transition('* => noanim', [])
])