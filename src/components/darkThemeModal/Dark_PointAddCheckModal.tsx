import React from 'react';
import { styled } from 'styled-components';
import { ModalAndModalType } from '../../types/ModalOpenTypes';
import { darkTheme, defaultTheme } from '../../style/theme';
interface Dark_PointAddCheckModal extends ModalAndModalType {
	onClickOpenModal: () => void;
	isOpenModal: boolean;
	phoneNumber: string;
	isNewUser: boolean | null;
}

function Dark_PointAddCheckModal({ isOpenModal, onClickOpenModal, phoneNumber, isNewUser }: Dark_PointAddCheckModal) {
	return isOpenModal ? (
		<ModalContainer onClick={onClickOpenModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<div className="ment">
					<p>
						{phoneNumber.slice(-4)} 님,{isNewUser ? '환영합니다 !' : '적립되었습니다!'}
					</p>
					<p>포인트를 적립하여 혜택을 받아보세요 ! </p>
				</div>
				<img className="pink-girl" src="/assets/user/pink_girl_dark.svg" alt="로켓" width={550} />
			</DialogBox>
		</ModalContainer>
	) : null;
}
const ModalContainer = styled.div`
	width: 100%;
	height: 100%;
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
	background-color: ${darkTheme.textColor.black};
	background-image: url('/assets/user/point_background_dark.svg');
	border: none;
	border-radius: 10px;
	box-sizing: border-box;
	z-index: 10000;
	.ment {
		background-color: ${defaultTheme.textColor.lightgray};
		width: 450px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 80px 20px;
		border-radius: 10px;
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

		p: first-child {
			font-size: ${({ theme }) => theme.fontSize['5xl']};
		}
		p: last-child {
			padding-top: 30px;
			font-size: ${({ theme }) => theme.fontSize.base};
			color: ${darkTheme.textColor.lightbrown};
		}
	}

	.pink-girl {
		position: absolute;
		bottom: 0;
		right: 30px;
	}
`;

export default Dark_PointAddCheckModal;
