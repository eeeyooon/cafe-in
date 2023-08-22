export const changeDateFormat = (numberDate: number) => {
	const newDate = new Date(numberDate);
	const year = newDate.getFullYear();
	const month = newDate.getMonth();
	const date = newDate.getDate();
	const hour = newDate.getHours();
	const minute = newDate.getMinutes();
	const sec = newDate.getSeconds();

	return { year, month, date, hour, minute, sec };
};

export const changePriceFormat = (price: string) => {
	return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const changeYYMMDD = (newDate: Date) => {
	const year = newDate.getFullYear();
	const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
	const day = newDate.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
};
