import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { KngxNavbarLayer } from '../interfaces';
import { KngxNavbarLayerEvent, KngxNavbarLayerInstance, latestProp } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class KngxNavbarService {
  private layers: BehaviorSubject<KngxNavbarLayer[]> = new BehaviorSubject<KngxNavbarLayer[]>([]);
  readonly layers$ = this.layers.asObservable();

  readonly events: Subject<KngxNavbarLayerEvent<unknown>> = new Subject<KngxNavbarLayerEvent<unknown>>();
  readonly events$ = this.events.asObservable();

  idx = 0;

  readonly title$ = this.layers$.pipe(
    latestProp('title')
  )

  readonly button$ = this.layers$.pipe(
    latestProp('button')
  )

  public registerNavbarLayer<T extends Omit<KngxNavbarLayer, 'id'>>(props: T): KngxNavbarLayerInstance<T & { id: number }> {
    const id = ++this.idx;

    const layer = { ...props, id };
    const instance = new KngxNavbarLayerInstance(layer, this.events$);

    this.layers.next(this.layers.value.concat(layer));

    return instance as KngxNavbarLayerInstance<T & { id: number }>;
  }

}
