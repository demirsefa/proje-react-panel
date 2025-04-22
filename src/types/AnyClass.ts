export type AnyClass = Record<string, any>;
export type AnyClassConstructor<T extends AnyClass> = new (...args: any[]) => T;
