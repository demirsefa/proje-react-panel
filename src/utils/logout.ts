import { setAuthLogout } from '../api/ApiConfig';
import { useAppStore } from '../store/store';

export function logout(navigate: () => void) {
  setAuthLogout();
  localStorage.removeItem('token');
  useAppStore.getState().logout();
  navigate();
}
