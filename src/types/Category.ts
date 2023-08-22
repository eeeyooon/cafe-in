export interface Item {
	options: string;
	date?: Date;
	id: number;
	name: string;
	price: number;
	imageName?: string;
	imageUrl?: string;
	category: string;
	soldOut?: boolean;
	quantity: number;
	totalPrice: number;
}

export interface Category {
	id: string;
	category: string;
	isShowOptionModal: boolean;
}
