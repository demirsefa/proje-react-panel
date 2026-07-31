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
export { DownloadCell } from './decorators/list/cells/DownloadCell';
export { LinkCell } from './decorators/list/cells/LinkCell';

//FORM
export { FormPage } from './components/form/FormPage';
export { Form, type OnSubmitFN, type FormGroup } from './decorators/form/Form';
export { Input } from './decorators/form/Input';
export { SelectInput } from './decorators/form/inputs/SelectInput';
export {
  RichTextInput,
  DEFAULT_RICH_TEXT_TOOLBAR,
  type RichTextInputOptions,
  type RichTextInputConfiguration,
  type RichTextToolbarItem,
} from './decorators/form/inputs/RichTextInput';
export {
  CustomInput,
  type CustomInputOptions,
  type CustomRenderProps,
} from './decorators/form/inputs/CustomInput';
//for nested form fields
export { getInputFields } from './decorators/form/Input';

//PANEL
export { Panel } from './components/Panel';

//DASHBOARD
export { Counter } from './components/Counter';
export { Dashboard, DashboardGrid, DashboardItem } from './components/dashboard';

//LAYOUT
export { Layout } from './components/layout';

//AUTH
export { Login } from './components/Login';
export { login } from './utils/login';
export { logout } from './utils/logout';
export { DefaultLoginForm } from './decorators/auth/DefaultLoginForm';

//API
export {
  initApi,
  initAuthToken,
  setAuthToken,
  setAuthLogout,
  getAxiosInstance,
  axiosInstance,
} from './api/ApiConfig';
export {
  getAll,
  getOne,
  create,
  createFormData,
  update,
  updateFormData,
  updateSimple,
  remove,
} from './api/CrudApi';
export { login as authLogin } from './api/AuthApi';

//TYPES
export type { LoginForm, LoginResponse } from './types/Login';

//SERVICES
export { updateDetailsData } from './services/DataService';
export { updateListData } from './services/DataService';
