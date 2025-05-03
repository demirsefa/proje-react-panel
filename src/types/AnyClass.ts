//TODO: any?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyClass = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyClassConstructor<T extends AnyClass> = new (...args: any[]) => T;
