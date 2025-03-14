import { getMetadataStorage } from 'class-validator';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { CellOptions, getCellFields } from './declerations/Cell';
import { CrudOptions, getClassCrudData } from './declerations/Crud';

type ScreenCreatorData<T> = {
  resolver: any,
  fields: string[],
  cells: CellOptions<T>[],
  crud: CrudOptions
}

export const StoreData: {
  screens: Record<string, ScreenCreatorData<any>>
} = {
  screens: {},
};

export function getFields<T>(entityClass: T): ScreenCreatorData<T> {
  const metadataStorage = getMetadataStorage();
  const targetMetadata = metadataStorage.getTargetValidationMetadatas(
    entityClass as any,
    '',
    false, false,
  );
  const crud = getClassCrudData(entityClass);
  return {
    resolver: classValidatorResolver(entityClass as any),
    fields: Array.from(new Set(targetMetadata.map((meta) => meta.propertyName))),
    cells: getCellFields(entityClass),
    crud: crud!,
  };
}


export function createScreens(screens: Record<string, any>) {
  StoreData.screens = screens;
}

