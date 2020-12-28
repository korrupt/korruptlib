import { animate, state, style, transition, trigger } from "@angular/animations";


// fixed, hidden, visible
export const fixed = trigger('fixed', [
    state('fixed',    style({ position: 'relative' })),
    state('visible',  style({ position: 'sticky' })),
    transition('fixed => visible', [
        style({ position: 'sticky', transform: 'translateY(-100%)' }),
        animate('250ms ease', style({ transform: 'translateY(0%)' })),
    ]),
    transition('visible => fixed', [
        style({ position: 'sticky', transform: 'translateY(0%)' }),
        animate('250ms ease', style({ transform: 'translateY(-100%)' })),
        style({ position: 'relative' })
    ]),
    transition('* => noanim', [])
])