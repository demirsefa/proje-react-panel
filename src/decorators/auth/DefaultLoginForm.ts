import { MinLength } from 'class-validator';
import { Form } from '../form/Form';
import { Input } from '../form/Input';
import { LoginForm as LoginFormInterface, LoginResponse } from '../../types/Login';
import { setAuthToken } from '../../api/ApiConfig';
import { login } from '../../utils/login';
import { User } from '../../types/User';
import { authLogin } from '../..';

@Form<LoginFormInterface, LoginResponse<User>>({
  onSubmit: authLogin,
  onSubmitSuccess: (data: LoginResponse<User>) => {
    setAuthToken(data.access_token);
    login(data.admin as User, data.access_token, () => {
      window.location.href = '/';
    });
  },
  type: 'formData',
})
export class DefaultLoginForm {
  @MinLength(3)
  @Input({
    label: 'Username',
  })
  username: string;

  @Input({
    label: 'Password',
    inputType: 'password',
  })
  password: string;
}
