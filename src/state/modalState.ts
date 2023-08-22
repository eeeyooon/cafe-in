import { atom } from 'recoil';

export const modalState = atom<boolean>({
	key: 'modalState',
	default: false,
});

export const modalTypeState = atom<string>({
	key: 'modalTypeState',
	default: '',
});

export const modalItemId = atom<string | undefined>({
	key: 'modalItemId',
	default: '',
});

export const modalUpdateState = atom<boolean>({
	key: 'modalUpdate',
	default: false,
});

export const notificationUserState = atom<string>({
	key: 'notificationUser',
	default: '',
});
