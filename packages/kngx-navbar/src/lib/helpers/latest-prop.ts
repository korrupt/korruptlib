import { map, Observable } from 'rxjs';
import { KngxNavbarLayer } from '../interfaces/navbar-layer';

export type LatestPropResult<T extends KngxNavbarLayer, U extends keyof T> = Observable<{
  id: number;
  value: T[U];
} | null>;


export function latestProp<T extends KngxNavbarLayer, U extends keyof T>(
  prop: U
): (source: Observable<T[]>) => LatestPropResult<T, U> {
  return (source: Observable<T[]>) => {
    return source.pipe(
      map((layers) => {
        const latest = layers
          .reverse()
          .find((layer) => layer[prop] !== undefined);

        if (!latest?.id) return null;

        const id = latest.id;
        const value = latest[prop];

        return { id, value };
      })
    );
  };
}
