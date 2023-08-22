import React, { useCallback, useEffect, useState } from 'react';
import { ModalDefaultType } from '../../types/ModalOpenTypes';
import { styled } from 'styled-components';
import CheckPointUsedIt from './CheckPointUsedIt';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Toast from '../adminMode/Toast';
import ModalPortal from '../ModalPortal';

function UsePointUser({ onClickToggleModal }: ModalDefaultType) {
	const [isOpenModal, setModalOpen] = useState<boolean>(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [userPoints, setUserPoints] = useState<number | null>(null);
	const [toastMessage, setToastMessage] = useState<string>('');
	useEffect(() => {
		if (toastMessage) {
			const timer = setTimeout(() => {
				console.log('메세지 있냐? ', toastMessage);
				setToastMessage(toastMessage);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [toastMessage]);
	const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value);

	const handleCloseBtnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClickToggleModal();
	};
	const fetchUserPoints = async (): Promise<number | null> => {
		try {
			const pointsCollection = collection(db, 'point');
			const q = query(pointsCollection, where('phoneNumber', '==', phoneNumber));
			const matchingDocs = await getDocs(q);
			if (!matchingDocs.empty) {
				const existingDoc = matchingDocs.docs[0];
				return existingDoc.data().point || 0;
			}
			return null;
		} catch (error) {
			console.error('포인트 가져오기 오류:', error);
			return null;
		}
	};
	const checkPointsAndSetMessage = async () => {
		const points = await fetchUserPoints();
		if (points === null) {
			setToastMessage('회원만 포인트 사용이 가능합니다!');
			return false;
		} else if (points === 0) {
			setToastMessage('사용할 수 있는 포인트가 없습니다.');
			return false;
		} else if (points < 1000) {
			setToastMessage(`1000포인트 이상 사용할 수 있습니다. 현재 ${points} 포인트 입니다.`);
			return false;
		} else {
			setUserPoints(points);
			return true;
		}
	};

	const onClickOpenModal = useCallback(async () => {
		const isPointsValid = await checkPointsAndSetMessage();
		setModalOpen(isPointsValid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [phoneNumber]);

	const handleUsePoints = async (usedPoints: number) => {
		try {
			if (!userPoints || userPoints < usedPoints) {
				setToastMessage('회원만 포인트 사용이 가능합니다!');
				return;
			}
			const remainingPoints = userPoints - usedPoints;
			setUserPoints(remainingPoints);

			const pointsCollection = collection(db, 'point');
			const q = query(pointsCollection, where('phoneNumber', '==', phoneNumber));
			const matchingDocs = await getDocs(q);

			if (!matchingDocs.empty) {
				const existingDoc = matchingDocs.docs[0];
				const docRef = doc(db, 'point', existingDoc.id);
				await updateDoc(docRef, { point: remainingPoints });
			}
		} catch (error) {
			console.error('포인트 사용 오류:', error);
		}
	};

	return (
		<ModalContainer onClick={onClickToggleModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<p>핸드폰 번호를 입력해주세요 </p>
				<PointInput>
					<label htmlFor="phone-number" hidden />
					<input
						type="number"
						id="phone-number"
						name="phonnumber"
						value={phoneNumber}
						placeholder="숫자만 입력해주세요"
						onChange={handlePhoneNumberChange}
					></input>
					<button>
						<img src="/assets/user/BackBtn_light.svg" alt="지우기" width={45} />
					</button>
				</PointInput>
				<BtnContainer>
					<CloseBtn onClick={handleCloseBtnClick}>취소</CloseBtn>
					<CloseBtn onClick={onClickOpenModal}>확인</CloseBtn>
				</BtnContainer>
			</DialogBox>
			{isOpenModal && (
				<CheckPointUsedIt
					onClickOpenModal={onClickToggleModal}
					isOpenModal={isOpenModal}
					points={userPoints}
					onUsePoints={handleUsePoints}
					phoneNumber={phoneNumber}
				/>
			)}
			{toastMessage && (
				<ModalPortal>
					<Toast text={toastMessage} />
				</ModalPortal>
			)}
			<Backdrop
				onClick={(e: React.MouseEvent) => {
					e.preventDefault();
					if (onClickToggleModal) {
						onClickToggleModal();
					}
				}}
			/>
		</ModalContainer>
	);
}
export const ModalContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: hidden;
`;
const DialogBox = styled.dialog`
	width: 500px;
	height: 500px;
	position: absolute;
	bottom: 0;
	top: 150px;
	left: 350px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.textColor.black)};
	border: none;
	border-radius: 10px;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	box-sizing: border-box;
	z-index: 10000;
	p {
		font-size: ${({ theme }) => theme.fontSize.xl};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	}
`;

const PointInput = styled.div`
	font-size: ${({ theme }) => theme.fontSize.base};
	margin-top: 50px;
	input {
		background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.lightgray : theme.textColor.white)};
		border: 1px solid ${({ theme }) => (theme.lightColor ? theme.textColor.lightbrown : 'none')};
		position: relative;
		width: 390px;
		padding: 20px;
		border-radius: 10px;
	}
	button {
		position: absolute;
		margin-top: 6px;
		padding: 7px;
		right: 60px;
		background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.lightgray : theme.textColor.white)};
		border-radius: 10px;
	}
	input:focus {
		outline: none;
	}
	/* input type number일때 증가 감소 버튼 없앰 */
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;
const CloseBtn = styled.button`
	margin-top: 50px;
	margin-left: 20px;
	border-radius: 10px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.lightgray : theme.darkColor?.sub)};
	width: 110px;
	height: 35px;
	font-size: ${({ theme }) => theme.fontSize.xl};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
`;
const BtnContainer = styled.div`
	display: flex;
	width: 390px;
	justify-content: flex-end;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
`;
const Backdrop = styled.div`
	width: 1194px;
	height: 838px;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0);
	z-index: 1;
	background-color: rgba(0, 0, 0, 0.2);
`;
export default UsePointUser;
