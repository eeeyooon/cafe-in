import { atom } from 'recoil';

export const isWaitingAvailableState = atom<boolean>({
	key: 'isWaitingAvailable',
	default: localStorage.getItem('isWaitingAvailable') === 'true' ? true : false,
});
