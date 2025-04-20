export type { OnSubmitFN, GetDetailsDataFN } from './components/pages/FormPage';
export type { InitPanelOptions } from './types/initPanelOptions';
export type { ScreenCreatorData } from './types/ScreenCreatorData';
export type { OnLogin } from './components/pages/Login';
export type { AnyClass } from './types/AnyClass';
export type {
  GetDataForList,
  PaginatedResponse,
  GetDataParams,
} from './components/components/list/ListPage';

export { ListPage } from './components/components/list/ListPage';
export { FormPage } from './components/pages/FormPage';
export type { FormPageProps } from './components/pages/FormPage';
export { Login } from './components/pages/Login';
export { Layout } from './components/layout/Layout';
export { Panel } from './components/Panel';
export { Counter } from './components/components/Counter';

//TODO: decerator index.ts ayır
export { List } from './decorators/list/List';
export { ImageCell } from './decorators/list/ImageCell';
export { Crud } from './decorators/Crud';
export { Cell } from './decorators/list/Cell';
export { Input } from './decorators/form/Input';
// Export page components
export { getFormFields } from './decorators/form/getFormFields';
export { getInputFields } from './decorators/form/Input';
