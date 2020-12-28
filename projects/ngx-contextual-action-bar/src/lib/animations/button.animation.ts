import { animate, group, query, style, transition, trigger } from '@angular/animations';

const optional = true;

export const buttonAnimation = trigger('buttonAnimation', [
    transition('* => *', [
        query('.new', [
            style({ opacity: 0, transform: 'rotate(180deg)' })
        ], {optional}),
        group([
            query('.old', [
                style({display: 'block'}),
                animate('150ms ease-in', style({ opacity: 0, transform: 'rotate(180deg)' })),
            ]),
            query('.new', [
                animate('150ms ease-in', style({ opacity: 1, transform: 'rotate(360deg)' }))
            ], {optional}),
        ])
    ])
])