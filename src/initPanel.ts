import { InitPanelOptions } from './types/initPanelOptions';
import { useAppStore } from './store/store';

export function initPanel({ screenPaths }: InitPanelOptions) {
  useAppStore.setState({ screenPaths });
}
