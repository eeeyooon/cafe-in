import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import ModalPortal from '../components/ModalPortal';
import Toast from '../components/adminMode/Toast';

interface RouteStateType {
	state: string;
}

function Thumbnail() {
	const navigate = useNavigate();
	const { state } = useLocation() as RouteStateType;
	const [isShowToast, setIsShowToast] = useState<boolean>(false);
	const redirectPath: string[] = useMemo(() => {
		return ['main', 'menu', 'waiting', 'orderhistory', 'sales', 'point', 'theme'];
	}, []);

	useEffect(() => {
		const mode = localStorage.getItem('mode');
		if (mode) {
			localStorage.removeItem('mode');
		}
		if (redirectPath.includes(state)) {
			window.history.replaceState({}, '');
			setIsShowToast(true);
		}
		const timer = setTimeout(() => setIsShowToast(false), 3000);
		return () => clearTimeout(timer);
	}, [redirectPath, state]);

	return (
		<>
			<ThumbnailWrapper>
				<AdminIcon>
					<AdminBtn
						aria-label="관리자 로그인 페이지로 이동하기"
						onClick={() => {
							navigate('/admin/login');
						}}
					>
						<img src={process.env.PUBLIC_URL + '/assets/paw_adminIcon.svg'} alt="관리자 아이콘" />
					</AdminBtn>
					<div onClick={() => navigate('/start')}></div>
				</AdminIcon>
				<ThumbnailContent onClick={() => navigate('/start')}>
					<Logo tabIndex={0} onClick={() => navigate('/start')}>
						<img alt="서비스 로고" />
					</Logo>
					<p className="logoText">- 카페에 꼭 필요한 서비스 -</p>
					<p className="thumbnailText">서비스 이용을 원하시면 화면을 클릭해주세요.</p>
				</ThumbnailContent>
			</ThumbnailWrapper>
			{isShowToast && (
				<ModalPortal>
					<Toast text={'로그인 후 이용 가능한 서비스입니다.'} />
				</ModalPortal>
			)}
		</>
	);
}

export default Thumbnail;

const ThumbnailWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.lightBeige : theme.darkColor?.background)};
	user-select: none;
	cursor: pointer;
`;

const Logo = styled.button`
	img {
		content: ${({ theme }) => (theme.lightColor ? 'url(/assets/logo_beige.svg)' : 'url(/assets/logo_dark.png)')};
	}
`;

const AdminIcon = styled.div`
	display: flex;
	div {
		width: 100%;
	}
`;

const AdminBtn = styled.button`
	width: 25px;
	height: 25px;
	margin: 30px;
`;

const ThumbnailContent = styled.div`
	height: 762px;
	width: 1194px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;

	.logoText {
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		margin-top: 32px;
	}

	.thumbnailText {
		font-size: ${({ theme }) => theme.fontSize['5xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		margin-top: 132px;
		margin-bottom: 132px;
	}
`;
