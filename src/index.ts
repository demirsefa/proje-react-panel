//DETAILS
export { DetailsPage } from './components/DetailsPage';
export { Details, type GetDetailsDataFN } from './decorators/details/Details';
export { DetailsItem } from './decorators/details/DetailsItem';

//LIST
export { ListPage } from './components/list/ListPage';
export {
  List,
  type GetDataForList,
  type PaginatedResponse,
  type GetDataParams,
} from './decorators/list/List';
export { ImageCell } from './decorators/list/cells/ImageCell';
export { Cell } from './decorators/list/Cell';

//FORM
export { FormPage } from './components/form/FormPage';
export { Form, type OnSubmitFN } from './decorators/form/Form';
export { Input } from './decorators/form/Input';
export { SelectInput } from './decorators/form/inputs/SelectInput';
export { DownloadCell } from './decorators/list/cells/DownloadCell';
//for nested form fields
export { getInputFields } from './decorators/form/Input';

//PANEL
export { Panel } from './components/Panel';

//DASHBOARD
export { Counter } from './components/Counter';

//LAYOUT
export { Layout } from './components/layout';

//AUTH
export { Login } from './components/Login';
export { login } from './utils/login';
export { logout } from './utils/logout';

//SERVICES
export { updateDetailsData } from './services/DataService';
