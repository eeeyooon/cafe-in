export interface OrderListType {
	date: string;
	id: number;
	list: OrderListItemType[];
	progress: string;
	takeOut: boolean;
	totalPrice: number;
}

export interface OrderListItemType {
	menu: string;
	isComplete: boolean;
	quantity: number;
	options: string;
}

export interface TodayDateType {
	year: number;
	month: number;
	date: number;
}
