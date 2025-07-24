import { getDetailsPageMeta } from '../decorators/details/getDetailsPageMeta';
import { AnyClass, AnyClassConstructor } from '../types/AnyClass';
import { useAppStore } from '../store/store';

export function updateDetailsData<T extends AnyClass>(
  model: AnyClassConstructor<T>,
  data: Partial<T>
) {
  const { class: detailsClass } = getDetailsPageMeta(model);
  const key = detailsClass.key;
  const id = detailsClass.primaryId;
  console.log('updateDetailsData', model, data, detailsClass);
  if (!data[id]) {
    throw new Error(`Id ${id} not found in data`);
  }

  useAppStore.getState().updateDetailsData(key, data[id]?.toString(), data);
}
