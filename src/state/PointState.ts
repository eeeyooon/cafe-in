import { atom } from 'recoil';

export const usedPointsState = atom<number | null>({
	key: 'enteredPointsState',
	default: null,
});
export const userPhoneNumberState = atom<string>({
	key: 'userPhoneNumberState',
	default: '',
});

export const userUsedPointsState = atom<number>({
	key: 'userUsedPointsState',
	default: 0,
});
