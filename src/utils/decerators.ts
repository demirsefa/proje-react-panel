export type DecoratorMap<T, K> = (
  prop: { target: object; propertyKey: string | symbol },
  options: T
) => K;

export function createDecorator<T extends { name?: string }, K>(
  key: symbol,
  options?: T,
  map?: DecoratorMap<T, K>
): PropertyDecorator {
  return (target, propertyKey) => {
    const propKeyStr = propertyKey.toString();
    const existingCells: string[] = Reflect.getMetadata(key, target) || [];

    if (options) {
      const keyString = `${key.toString()}:${propKeyStr}:options`;
      const config = map ? map({ target, propertyKey }, options) : options;

      Reflect.defineMetadata(key, [...existingCells, propKeyStr], target);
      Reflect.defineMetadata(keyString, config, target);
    } else {
      Reflect.defineMetadata(key, [...existingCells, propKeyStr], target);
    }
  };
}
