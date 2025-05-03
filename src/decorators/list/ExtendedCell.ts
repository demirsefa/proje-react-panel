import { CELL_KEY, CellConfiguration, CellOptions, ExtendedCellTypes, cellMap } from './Cell';
import { createDecorator, DecoratorMap } from '../../utils/decerators';

export interface ExtendedCellOptions extends Omit<CellOptions, 'type'> {
  type?: ExtendedCellTypes;
}

interface ExtendedCellConfiguration extends Omit<CellConfiguration, 'name'> {
  name?: string;
}

export function ExtendedCell<T extends ExtendedCellOptions, K extends ExtendedCellConfiguration>(
  options?: T,
  map?: DecoratorMap<T, K>
): PropertyDecorator {
  return createDecorator<T, K>(CELL_KEY, options, ({ target, propertyKey }, optionsInner) => {
    const config = cellMap({ target, propertyKey }, optionsInner as CellOptions);
    const newConfig: K | undefined = map ? map({ target, propertyKey }, optionsInner) : undefined;
    return {
      ...config,
      ...newConfig,
    } as K;
  });
}
