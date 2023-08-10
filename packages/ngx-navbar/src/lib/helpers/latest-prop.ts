import { map, Observable } from "rxjs";
import { NavbarLayer } from "../interfaces/navbar-layer";

export type LatestPropResult<T extends keyof NavbarLayer> = Observable<{ id: number, value: NonNullable<NavbarLayer[T]> } | null>;

export function latestProp<T extends keyof NavbarLayer>(prop: T): (source: Observable<NavbarLayer[]>) => LatestPropResult<T> {
    return (source: Observable<NavbarLayer[]>) => {
        return source.pipe(
            map((layers) => {
                const latest = layers.reverse().find((layer) => layer[prop] !== undefined);
                
                if (!latest || latest[prop] == undefined) return null;

                const id = latest.id;
                const value = latest[prop]!;

                return { id, value };
            })
        )
    }
}