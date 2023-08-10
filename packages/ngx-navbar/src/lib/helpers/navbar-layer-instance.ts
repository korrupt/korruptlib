import { filter, map, Observable, Subject, takeUntil } from "rxjs";
import { NavbarLayer } from "../interfaces";
import { NavbarLayerEvent } from "./navbar-layer-event";


export class NavbarLayerInstance<T extends NavbarLayer> {
    constructor(
        readonly layer: T,
        private readonly _eventsStream$: Observable<NavbarLayerEvent>
    ) {}

    
    private readonly destroy$ = new Subject<void>();
    private readonly events$ = this._eventsStream$.pipe(
        takeUntil(this.destroy$),
        filter((event) => event.id === this.layer.id),
    )

    public readonly buttonClicked: Observable<void> = this.events$.pipe(
        filter(({ type }) => type === 'BUTTON'),
        map(() => undefined)
    )

}