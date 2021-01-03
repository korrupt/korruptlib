import { animate, state, style, transition, trigger } from "@angular/animations";

import * as easings from "../material/easings";
import * as timings from "../material/timings";

// none, prominent, regular
export const paddingAnimation = trigger('padding', [
    transition('* => prominent', [
        style({ paddingTop: 128 }),
        animate(`${timings.medium_enter} ${easings.standard}`, style({ paddingTop: 0 }))
    ]),
    transition('* => regular', [
        style({ paddingTop: 56 }),
        animate(`${timings.medium_enter} ${easings.standard}`, style({ paddingTop: 0 }))
    ]),
    transition('* => none', [
        style({ padding: '!'}),
        animate(`${timings.medium_enter} ${easings.standard}`, style({ padding: 0 }))
    ])
])