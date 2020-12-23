declare module "arr-xor" {
    export default function xor<T>(a: T[], b: T[], predicate?: (a: T, b: T) => boolean): T[];
}