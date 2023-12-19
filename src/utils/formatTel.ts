export const formatTel = (tel: string) => {
	const cleanNumber = tel.replace(/\D/g, '');
	const firstPart = cleanNumber.slice(0, 3);
	const secondPart = cleanNumber.slice(3, 7);
	const thirdPart = cleanNumber.slice(7);
	return `${firstPart}-${secondPart}-${thirdPart}`;
};
