export interface Option {
	id: number;
	category: string;
	name: string;
	price: number;
	options: string;
}

export interface selectedItem {
	category: string;
	id: number;
	date?: Date;
	name: string;
	price: number;
	options: string;
	quantity: number;
	totalPrice: number;
	progress?: string;
}
export interface orderList {
	id: number;
	menu: string;
	options: string;
	progress: string;
	quantity: number;
	status: string;
	takeout: boolean;
	totalPrice: number;
}
