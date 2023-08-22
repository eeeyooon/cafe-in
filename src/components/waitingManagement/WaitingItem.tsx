import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { db } from '../../firebase/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import {
	modalItemId,
	modalState,
	modalTypeState,
	modalUpdateState,
	notificationUserState,
} from '../../state/ModalState';
import { WaitingDataType } from '../../types/waitingDataType';

type WaitingItemProps = {
	waitingInfo: WaitingDataType[];
	waitingDataStatus: string;
};

const WaitingItem = (props: WaitingItemProps) => {
	const { waitingInfo, waitingDataStatus } = props;
	const setIsOpenModal = useSetRecoilState<boolean>(modalState);
	const [modalType, setModalType] = useRecoilState<string>(modalTypeState);
	const [itemId, setItemId] = useRecoilState<string | undefined>(modalItemId);
	const [modalUpdate, setModalUpdate] = useRecoilState<boolean>(modalUpdateState);
	const setNotificationUser = useSetRecoilState<string>(notificationUserState);

	const updateStatus = async (id: string, type: string) => {
		const statusDoc = doc(db, 'waitingList', id);
		try {
			await updateDoc(statusDoc, { status: type });
			setModalUpdate(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (itemId && modalUpdate && modalType !== 'notification') {
			updateStatus(itemId, modalType);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalUpdate, itemId, modalType]);

	const formatTel = (tel: string) => {
		const cleanNumber = tel.replace(/\D/g, '');
		const firstPart = cleanNumber.slice(0, 3);
		const secondPart = cleanNumber.slice(3, 7);
		const thirdPart = cleanNumber.slice(7);
		return `${firstPart}-${secondPart}-${thirdPart}`;
	};

	const showWaitingList = () => {
		return waitingInfo
			.sort((a, b) => a.no - b.no)
			.map((value) => (
				<WaitingItemWrapper key={value.id}>
					<td width={'130px'}>{value.no}번</td>
					<td width={'110px'}>{value.name}</td>
					<td width={'120px'}>{value.personNum}명</td>
					<td width={'250px'}>{formatTel(value.tel)}</td>
					<WatingBtnWrapper width={'300px'}>
						{waitingDataStatus === 'waiting' ? (
							<>
								<ShortBtn
									onClick={() => {
										setIsOpenModal(true);
										setModalType('notification');
										setItemId(value.id);
										setNotificationUser(value.name);
									}}
								>
									알림
								</ShortBtn>
								<ShortBtn
									onClick={() => {
										setIsOpenModal(true);
										setModalType('cancel');
										setItemId(value.id);
									}}
								>
									취소
								</ShortBtn>
								<LongBtn
									onClick={() => {
										setIsOpenModal(true);
										setModalType('seated');
										setItemId(value.id);
									}}
								>
									착석 완료
								</LongBtn>
							</>
						) : (
							<span className="waitingStatus">{value.status === 'seated' ? '착석 완료' : '취소'}</span>
						)}
					</WatingBtnWrapper>
				</WaitingItemWrapper>
			));
	};

	return <>{showWaitingList()}</>;
};

export default WaitingItem;

const WaitingItemWrapper = styled.tr`
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	border: ${({ theme }) => (theme.lightColor ? 'none' : `1px solid ${theme.textColor.white}`)};
	width: 982px;
	height: 72px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	padding-left: 40px;
	padding-right: 30px;
	margin: 0 auto;
	margin-bottom: 12px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	td {
		display: flex;
		justify-content: center;
	}
`;

const WatingBtnWrapper = styled.td`
	width: 300px;
	height: 48px;
	color: ${({ theme }) =>
		theme.lightColor
			? theme.color === 'purple'
				? theme.textColor.black
				: theme.textColor.white
			: theme.textColor.white};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	display: flex;
	justify-content: center;
	align-items: center;

	.waitingStatus {
		color: ${({ theme }) => (theme.lightColor ? theme.lightColor.point : theme.darkColor.main)};
	}
`;

const ShortBtn = styled.button`
	width: 65px;
	height: 48px;
	margin-right: 14px;
	border-radius: 10px;
	background-color: ${({ theme }) =>
		theme.lightColor
			? theme.color === 'purple' || theme.color === 'blue'
				? theme.lightColor.sub
				: theme.lightColor.point
			: theme.darkColor?.main};
`;

const LongBtn = styled.button`
	width: 113px;
	height: 48px;
	border-radius: 10px;
	background-color: ${({ theme }) =>
		theme.lightColor
			? theme.color === 'purple' || theme.color === 'blue'
				? theme.lightColor.sub
				: theme.lightColor.point
			: theme.darkColor?.main};
`;
