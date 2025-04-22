export type { OnSubmitFN, GetDetailsDataFN } from './components/form/FormPage';
export type { InitPanelOptions } from './types/initPanelOptions';
export type { ScreenCreatorData } from './types/ScreenCreatorData';
export type { OnLogin } from './components/Login';
export type { AnyClass } from './types/AnyClass';
export type { GetDataForList, PaginatedResponse, GetDataParams } from './components/list/ListPage';

export { ListPage } from './components/list/ListPage';
export { FormPage } from './components/form/FormPage';
export type { FormPageProps } from './components/form/FormPage';
export { Login } from './components/Login';
export { Layout } from './components/layout/Layout';
export { Panel } from './components/Panel';
export { Counter } from './components/Counter';

//TODO: decerator index.ts ayır
export { List } from './decorators/list/List';
export { ImageCell } from './decorators/list/ImageCell';
export { Crud } from './decorators/Crud';
export { Cell } from './decorators/list/Cell';
export { Input } from './decorators/form/Input';
// Export page components
export { getFormFields } from './decorators/form/getFormFields';
export { getInputFields } from './decorators/form/Input';
