import { animate, state, style, transition, trigger } from "@angular/animations";

export const ActiveAnimation = trigger('active', [
    state('true', style({ display: 'inline-block' })),
    state('false', style({ display: 'none' })),
    transition('false => true', [
        style({ opacity: 0, display: 'inline-block' }),
        animate('200ms ease', style({ opacity: 1 }))
    ])
])