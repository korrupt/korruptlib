import { animate, group, query, style, transition, trigger } from '@angular/animations';

// const optional = true;

import * as easings from '../material/easings';
import * as timings from '../material/timings';

export const buttonAnimation = trigger('buttonAnimation', [
    transition((from, to, el) => {
        return from == to
    }, []),
    transition((from, to, element) => {                
        return ((from != 'void') && to == 'void')
    }, [
        style({ width: '!', overflow: 'hidden', opacity: 1 }),
        animate(`90ms ${easings.accelerated}`, style({ opacity: 0 })),
        animate(`110ms ${easings.standard}`, style({ width: 0 }))
    ]),
    transition((from, to, element) => {                
        return ((from == 'void') && to != 'void')
    }, [
        style({ width: 0, overflow: 'hidden', opacity: 0 }),
        animate(`90ms ${easings.accelerated}`, style({ width: '*' })),
        animate(`110ms ${easings.standard}`, style({ opacity: 1 }))
    ]),
    // transition((from, to) => {
    //     return from === undefined && to !== undefined
    // }, [
    //     query('.new', [
    //         style({ opacity: 0 }),
    //     ])
    // ]),
    transition(('* <=> *'), [
        query('.new', [
            style({ opacity: 0, transform: 'rotate(180deg)' })
        ]),
        group([
            query('.old', [
                style({display: 'block'}),
                animate(`${timings.small_enter} ${easings.accelerated}`, style({ opacity: 0, transform: 'rotate(180deg)' })),
            ]),
            query('.new', [
                animate(`${timings.small_enter} ${easings.decelerated}`, style({ opacity: 1, transform: 'rotate(360deg)' }))
            ]),
        ])
    ]),

])