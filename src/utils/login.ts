import { useAppStore } from '../store/store';
import { User } from '../types/User';

export function login(user: User, token: string, navigate: () => void) {
  localStorage.setItem('token', token);
  useAppStore.getState().login(user);
  navigate();
}
