import { KngxNavbarLayerInstance } from "./navbar-layer-instance";

export const ReleaseLayer = (): PropertyDecorator => {
    return function(target: any, propertyKey: string | symbol) {
        let value: any;
        const originalMethod = target.ngOnDestroy || new Function();


        const getter = function() {
            return value;
        }

        const setter = function(this: any, v: any) {
            const proto = Object.getPrototypeOf(this);
            
            
            proto.ngOnDestroy = () => {
                originalMethod();
                const layer: KngxNavbarLayerInstance<any> | null = proto[propertyKey];

                if (layer) {
                    layer.release();
                }
            }

            value = v;
        }

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        })
    }
}