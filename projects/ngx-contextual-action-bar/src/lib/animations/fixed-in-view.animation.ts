import { animate, state, style, transition, trigger } from '@angular/animations';

export const fixedInView = trigger('fixedInView', [
    state('true', style({
        position: 'fixed'
    })),
    state('false', style({
        position: 'absolute'
    })),
    transition('false => true', [
        style({transform: 'translateY(-100%)'}),
        style({position: 'fixed'}),
        animate('300ms ease', style({transform: 'translateY(0%)'}))
    ]),
    transition('true => false', [
        animate('300ms ease', style({transform: 'translateY(-100%)'})),
        style({position: 'absolute'})
    ])
])