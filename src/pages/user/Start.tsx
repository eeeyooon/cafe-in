import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styled, useTheme } from 'styled-components';
import { isWaitingAvailableState } from '../../state/WaitingState';
import { takeOutState } from '../../state/TakeOut';

function Start() {
	const navigate = useNavigate();
	const isWaitingAvailable = useRecoilValue<boolean>(isWaitingAvailableState);
	const setTakeOut = useSetRecoilState(takeOutState);
	const theme = useTheme();
	return (
		<StartWrapper>
			<BackIconWrapper>
				<BackIcon
					onClick={() => {
						navigate('/');
					}}
				>
					<img
						src={
							process.env.PUBLIC_URL +
							(theme.lightColor ? '/assets/admin/back_light.svg' : '/assets/admin/back_dark.svg')
						}
						alt="뒤로가기 버튼"
					/>
				</BackIcon>
			</BackIconWrapper>
			<TakeOutBoxWrapper>
				{isWaitingAvailable ? (
					<TakeOutBox
						onClick={() => {
							navigate('/waiting');
						}}
						aria-label="대기 신청하기"
					>
						대기
					</TakeOutBox>
				) : (
					<TakeOutBox
						onClick={() => {
							navigate('/menu');
							setTakeOut(false);
						}}
						aria-label="매장에서 먹고 가기 선택"
					>
						매장
					</TakeOutBox>
				)}

				<TakeOutBox
					onClick={() => {
						navigate('/menu');
						setTakeOut(true);
					}}
					aria-label="테이크 아웃 선택"
				>
					테이크 아웃
				</TakeOutBox>
			</TakeOutBoxWrapper>
		</StartWrapper>
	);
}

export default Start;

const StartWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) =>
		theme.lightColor
			? theme.color === 'yellow'
				? theme.textColor.lightBeige
				: theme.lightColor.background
			: theme.darkColor?.background};
	user-select: none;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-around;
	align-items: center;
`;

const TakeOutBoxWrapper = styled.div`
	width: 834px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 200px;
	margin-top: 50px;
`;

const BackIconWrapper = styled.div`
	width: 1115px;
`;

const BackIcon = styled.button`
	text-align: left;
	width: 30px;

	img {
		width: 30px;
	}
`;

const TakeOutBox = styled.button`
	width: 350px;
	height: 416px;
	border-radius: 15px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.main)};
	border: 3px solid ${({ theme }) => (theme.lightColor ? theme.lightColor.point : theme.darkColor?.main)};
	color: ${({ theme }) => (theme.lightColor ? theme.lightColor.point : theme.textColor.white)};
	font-size: ${({ theme }) => theme.fontSize['6xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
