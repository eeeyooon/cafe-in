import { atom } from 'recoil';
import { Order } from '../types/Order';

export const orderListStateAtom = atom<Order[]>({
	key: 'orderListState',
	default: [],
});
