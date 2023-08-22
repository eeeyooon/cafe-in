import { atom } from 'recoil';
import { CategoryType } from '../types/menuMangementType';
import { Category } from '../types/Category';

export const categoryListState = atom<CategoryType[]>({
	key: 'categoryListState',
	default: [],
});

export const selectedCategoryState = atom<string>({
	key: 'selectedCategoryState',
	default: '',
});

export const categoriesState = atom<Category[]>({
	key: 'categories',
	default: [],
});
