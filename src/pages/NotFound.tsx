import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function NotFound() {
	const naviagte = useNavigate();
	return (
		<NotFoundWrapper>
			<SorryIcon>
				<img alt="로고" />
			</SorryIcon>
			<NotFoundText>
				<p>페이지를 찾을 수 없습니다.</p> <p>존재하지 않는 주소를 입력하셨거나,</p>
				<p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
			</NotFoundText>
			<ToHome
				aria-label="홈으로 이동하기"
				onClick={() => {
					naviagte('/home');
				}}
			>
				&gt; 홈으로 이동하기
			</ToHome>
		</NotFoundWrapper>
	);
}

export default NotFound;

const NotFoundWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	user-select: none;
`;

const SorryIcon = styled.div`
	img {
		content: ${({ theme }) =>
			theme.lightColor ? 'url(/assets/admin/sorryIcon.svg)' : 'url(/assets/admin/sorryIcon_dark.svg)'};
	}
`;

const NotFoundText = styled.div`
	font-size: ${({ theme }) => theme.fontSize['4xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	margin-top: 60px;
	text-align: center;
	line-height: 40px;
`;

const ToHome = styled.button`
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	margin-top: 27px;
	margin-bottom: 100px;
`;
