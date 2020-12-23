import { animate, style, transition, trigger } from "@angular/animations";

export const ActionAnimation = trigger('action', [
    transition(':enter', [
        style({ opacity : 0}),
        animate('300ms ease', style({opacity: 1}))
    ]),
])