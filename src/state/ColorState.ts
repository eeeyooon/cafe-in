import { atom } from 'recoil';
import { SelectedColorType } from '../style/theme';

export const selectedColorState = atom<SelectedColorType>({
	key: 'selectedColor',
	default: 'yellow',
});
