import { animate, animateChild, query, transition, trigger } from "@angular/animations";

export const layerSwitchAnimation = trigger('layerSwitch', [
    transition((from, to) => {        
        return from == 'void'
    }, [
        query('*', animate(0))
    ]),
    transition(':enter', [
        query('*', animate(0))
    ]),
    transition('* => *', [
        query('*', animateChild(), {  optional: false })
    ])
])