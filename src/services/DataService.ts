import { getDetailsPageMeta } from '../decorators/details/getDetailsPageMeta';
import { AnyClass, AnyClassConstructor } from '../types/AnyClass';
import { useAppStore } from '../store/store';
import { getListPageMeta } from '../decorators/list/getListPageMeta';

export function updateDetailsData<T extends AnyClass>(
  model: AnyClassConstructor<T>,
  data: Partial<T>
) {
  const { class: detailsClass } = getDetailsPageMeta(model);
  const key = detailsClass.key;
  if (!detailsClass.primaryId) {
    throw new Error('Primary id is required to use this utility function');
  }

  if (!data[detailsClass.primaryId]) {
    throw new Error(`Id ${detailsClass.primaryId} not found in data`);
  }

  useAppStore.getState().updateDetailsData(key, data[detailsClass.primaryId]?.toString(), data);
}

export function updateListData<T extends AnyClass>(
  model: AnyClassConstructor<T>,
  data: Partial<T>
) {
  const { class: listClass } = getListPageMeta(model);
  const key = listClass.key;
  if (!listClass.primaryId) {
    throw new Error('Primary id is required to use this utility function');
  }

  if (!data[listClass.primaryId]) {
    throw new Error(`Id ${listClass.primaryId} not found in data`);
  }

  useAppStore.getState().updateListData(key, data[listClass.primaryId]?.toString(), data);
}
