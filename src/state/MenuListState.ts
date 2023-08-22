import { atom } from 'recoil';
import { MenuType } from '../types/menuMangementType';

export const menuListState = atom<MenuType[]>({
	key: 'menuListState',
	default: [],
});
