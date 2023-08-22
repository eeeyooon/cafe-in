import { WaitingDataType } from '../types/waitingDataType';

//* 당일 날짜 + 선택한 status(waitingDataStatus)에 따라 해당 status의 data만 저장해서 리턴하는 함수

export const filterTodayWaiting = (waitingList: WaitingDataType[], waitingDataStatus: string) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const todayWaiting = waitingList.filter(
		(value) =>
			new Date(value.date).getDate() === today.getDate() &&
			new Date(value.date).getMonth() === today.getMonth() &&
			new Date(value.date).getFullYear() === today.getFullYear(),
	);

	if (waitingDataStatus === 'waiting') {
		return todayWaiting.filter((value) => value.status === 'waiting');
	} else if (waitingDataStatus === 'waited') {
		return todayWaiting.filter((value) => value.status === 'seated' || value.status === 'cancel');
	}

	return [];
};
