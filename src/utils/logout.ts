import { useAppStore } from '../store/store';

export function logout(navigate: () => void) {
  localStorage.removeItem('token');
  useAppStore.getState().logout();
  navigate();
}
