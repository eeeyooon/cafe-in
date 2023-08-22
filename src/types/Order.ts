export type OrderProgress = '진행중' | '주문완료';

export interface Order {
	id: number;
	date: string;
	progress: OrderProgress;
	takeOut: boolean;
	list: {
		imgUrl: string;
		menu: string;
		quantity: number;
		options: string;
		isComplete: boolean;
		totalPrice: number;
	}[];
}
