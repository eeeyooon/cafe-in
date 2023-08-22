import React, { useCallback, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { ModalDefaultType } from '../../types/ModalOpenTypes';
import PointAddCheckModal from '../UserMode/PointAddCheckModal';
import { darkTheme, defaultTheme } from '../../style/theme';
import Dark_PointAddCheckModal from '../darkThemeModal/Dark_PointAddCheckModal';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
function AddPointModal({ onClickToggleModal }: ModalDefaultType) {
	const theme = useTheme();
	const [phoneNumber, setPhoneNumber] = useState('');
	const [isOpenModal, setModalOpen] = useState<boolean>(false);
	const [isNewUser, setIsNewUser] = useState<boolean | null>(null);

	const handleCloseBtnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClickToggleModal();
	};
	const onClickOpenModal = useCallback(async () => {
		setModalOpen(true);

		const pointsCollection = collection(db, 'point');
		const q = query(pointsCollection, where('phoneNumber', '==', phoneNumber));

		const matchingDocs = await getDocs(q);

		if (!matchingDocs.empty) {
			// 이미 존재하는 문서에 포인트를 500 증가
			const existingDoc = matchingDocs.docs[0];
			const docRef = doc(db, 'point', existingDoc.id);
			const currentPoints = existingDoc.data().point || 0;
			setIsNewUser(false);
			await updateDoc(docRef, {
				point: currentPoints + 500,
			});
		} else {
			// 존재하지 않는 경우 새로운 문서를 추가하고 포인트를 1000으로 설정
			setIsNewUser(true);
			const userToBeAdded = {
				date: Date.now(),
				phoneNumber: phoneNumber,
				point: 1000,
			};

			await addDoc(pointsCollection, userToBeAdded);
		}

		setTimeout(() => {
			setModalOpen(true);
			onClickToggleModal();
		}, 2000);
	}, [phoneNumber, onClickToggleModal]);

	return (
		<ModalContainer onClick={onClickToggleModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<p> 이용약관과 개인 정보 취급 방침에 동의하시면 적립 버튼을 눌러주세요 </p>
				<PointInput>
					<label htmlFor="phone-number" hidden />
					<input
						type="number"
						id="phone-number"
						name="phonnumber"
						placeholder="숫자만 입력해주세요"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<button>
						<img src="/assets/user/BackBtn_light.svg" alt="지우기" width={45} />
					</button>
				</PointInput>
				<BtnContainer>
					<CloseBtn onClick={handleCloseBtnClick}>취소</CloseBtn>
					<CloseBtn onClick={onClickOpenModal}>적립</CloseBtn>
				</BtnContainer>
			</DialogBox>
			{isOpenModal &&
				(theme.lightColor ? (
					<PointAddCheckModal
						onClickOpenModal={onClickOpenModal}
						isOpenModal={isOpenModal}
						phoneNumber={phoneNumber}
						isNewUser={isNewUser}
					/>
				) : (
					<Dark_PointAddCheckModal
						onClickOpenModal={onClickOpenModal}
						isOpenModal={isOpenModal}
						phoneNumber={phoneNumber}
						isNewUser={isNewUser}
					/>
				))}
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
const ModalContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: hidden;
`;
const DialogBox = styled.dialog`
	width: 700px;
	height: 500px;
	position: absolute;
	top: 150px;
	left: 280px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) =>
		theme.lightColor ? defaultTheme.lightColor?.background : darkTheme.textColor.black};
	border: none;
	border-radius: 10px;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	box-sizing: border-box;
	z-index: 10000;
	p {
		font-size: ${({ theme }) => theme.fontSize.sm};
		color: ${({ theme }) => theme.textColor.darkgray};
	}
`;

export const PointInput = styled.div`
	font-size: ${({ theme }) => theme.fontSize.base};
	margin-top: 10px;
	input {
		background-color: ${({ theme }) => theme.textColor.lightbrown};
		border: 1px solid ${({ theme }) => theme.textColor.lightbrown};
		position: relative;
		width: 390px;
		padding: 20px;
		border-radius: 10px;
	}
	button {
		position: absolute;
		margin-top: 6px;
		padding: 7px;
		right: 160px;
		background-color: ${({ theme }) => theme.textColor.lightbrown};
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
export const CloseBtn = styled.button`
	margin-top: 10px;
	margin-left: 10px;
	border-radius: 10px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.lightgray : theme.darkColor?.sub)};
	width: 110px;
	height: 35px;
	font-size: ${({ theme }) => theme.fontSize['xl']};
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
	height: 834px;
	position: fixed;
	overflow-y: hidden;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0); /* 추가 */
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.2);
`;
export default AddPointModal;
