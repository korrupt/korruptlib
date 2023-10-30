import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { ExtractActions, KngxNavbarLayer, KngxNavbarLayerActionEvent, KngxNavbarLayerEvent} from '../interfaces';
/**
 * Helper-object to manage navbar layers
 */
export class KngxNavbarLayerInstance<T extends KngxNavbarLayer> {
  constructor(
    readonly layer: T,
    private readonly _eventsStream$: Observable<KngxNavbarLayerEvent<T>>,
    readonly release: () => void,
  ) {}

  private readonly destroy$ = new Subject<void>();
  private readonly events$ = this._eventsStream$.pipe(
    takeUntil(this.destroy$),
    filter((event) => event.id === this.layer.id)
  );

  public readonly buttonClicked: Observable<void> = this.events$.pipe(
    filter(({ type }) => type === 'BUTTON'),
    map(() => undefined)
  );

  public readonly actionClicked: Observable<ExtractActions<T>> = this.events$.pipe(
    filter((event): event is KngxNavbarLayerActionEvent<T> => event.type === 'ACTION'),
    map((event) => event.action)
  )
}
