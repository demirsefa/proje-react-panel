import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { useNavigate } from 'react-router';
import { useAppStore } from '../../store/store';

interface LoginFormData {
  username: string;
  password: string;
}

export type OnLogin = {
  login: (username: string, password: string) => Promise<LoginResponse>;
};

interface LoginResponse {
  user: any; // Replace with proper user type if available
  token: string;
}

interface LoginProps {
  onLogin: OnLogin;
}

export function Login({ onLogin }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormData) => {
    onLogin.login(data.username, data.password).then((dataInner: LoginResponse) => {
      const { user, token } = dataInner;
      localStorage.setItem('token', token);
      useAppStore.setState({ user });
      navigate('/');
    });
  };

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <FormField
            input={{
              name: 'username',
              label: 'Username',
              placeholder: 'Enter your username',
              type: 'input',
            }}
            register={register}
            error={errors.username}
          />
          <FormField
            input={{
              name: 'password',
              label: 'Password',
              inputType: 'password',
              placeholder: 'Enter your password',
              type: 'input',
            }}
            register={register}
            error={errors.password}
          />
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
