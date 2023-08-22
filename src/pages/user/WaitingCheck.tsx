import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function WaitingCheck() {
	const navigate = useNavigate();
	const location = useLocation();
	const [remainingTime, setRemainingTime] = useState<number>(20);

	//? 대기 신청 페이지에서 넘겨 받은 대기 번호
	const { userWaitingNum } = location.state;

	const RemainingTimeText = ({ remainingTime }: { remainingTime: number }) => {
		return <p className="remainingTimeText">{remainingTime}초 뒤에 자동으로 홈 화면으로 이동합니다.</p>;
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setRemainingTime((prevTime) => prevTime - 1);
		}, 1000);

		if (remainingTime === 0) {
			goToHome();
		}

		return () => clearTimeout(timeoutId);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [remainingTime]);

	const goToHome = useCallback(() => {
		navigate('/home');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<WaitingCheckWrapper>
			<WaitingCheckHeaderText>
				신청 완료! <p>순서가 되면 알림으로 알려드립니다.</p>
			</WaitingCheckHeaderText>
			<WaitingNumWrapper>
				<LeftFireworks />
				<WaitingNumText>{userWaitingNum}번</WaitingNumText>
				<RightFireworks />
			</WaitingNumWrapper>
			<RemainingTimeText remainingTime={remainingTime} />
			<HomeBtn onClick={goToHome}>
				홈화면으로 <p>이동하기</p>
			</HomeBtn>
		</WaitingCheckWrapper>
	);
}

export default WaitingCheck;

const WaitingCheckWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-around;
	align-items: center;
	user-select: none;

	.remainingTimeText {
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		font-size: ${({ theme }) => theme.fontSize['2xl']};
	}
`;

const WaitingCheckHeaderText = styled.h1`
	width: 558px;
	height: 96px;
	font-size: ${({ theme }) => theme.fontSize['5xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	padding-top: 10px;

	p {
		margin-top: 10px;
	}
`;

const WaitingNumWrapper = styled.div`
	width: 324px;
	height: 308px;
	border-radius: 50%;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.sub : theme.darkColor?.main)};
	color: ${({ theme }) => theme.textColor.white};
	font-size: ${({ theme }) => theme.fontSize['7xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	position: relative;
	border: 15px double white;
`;

const LeftFireworks = styled.img`
	content: ${({ theme }) => (theme.lightColor ? 'url(/assets/user/fireworks_light.svg)' : 'none')};
	position: absolute;
	left: -10%;
	top: 0;
`;

const RightFireworks = styled.img`
	content: ${({ theme }) => (theme.lightColor ? 'url(/assets/user/fireworks_light.svg)' : 'none')};
	position: absolute;
	right: -10%;
	top: 70%;
`;

const WaitingNumText = styled.div`
	position: absolute;
	top: 40%;
	left: 32%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 7px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.white};
`;

const HomeBtn = styled.button`
	width: 222px;
	height: 90px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.textColor.lightbrown};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};

	p {
		margin-top: 3px;
	}
`;
