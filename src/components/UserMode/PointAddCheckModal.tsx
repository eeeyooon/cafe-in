import React from 'react';
import { styled } from 'styled-components';
import { ModalAndModalType } from '../../types/ModalOpenTypes';
interface PointAddCheckModalProps extends ModalAndModalType {
	isOpenModal: boolean;
	phoneNumber: string;
	isNewUser: boolean | null;
}

function PointAddCheckModal({ isOpenModal, onClickOpenModal, phoneNumber, isNewUser }: PointAddCheckModalProps) {
	return isOpenModal ? (
		<ModalContainer onClick={onClickOpenModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<img className="phone-light" src="/assets/user/phonehuman_light.svg" alt="폰" width={226} />
				<div className="ment">
					<p>
						{phoneNumber.slice(-4)} 님,{isNewUser ? '환영합니다 !' : '적립되었습니다!'}
					</p>
					<p>포인트를 적립하여 혜택을 받아보세요 ! </p>
				</div>
				<img className="rocket-light" src="/assets/user/rocket_light.svg" alt="로켓" width={332} />
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
	background-image: url('/assets/user/point_background_light.svg');
	border: none;
	border-radius: 10px;
	box-sizing: border-box;
	z-index: 10000;
	.ment {
		background-color: ${({ theme }) => theme.lightColor?.background};
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
			color: ${({ theme }) => theme.textColor.darkgray};
		}
	}
	.phone-light {
		position: absolute;
		bottom: 40px;
		left: 0;
	}
	.rocket-light {
		position: absolute;
		top: 60px;
		right: 0;
	}
`;

export default PointAddCheckModal;
