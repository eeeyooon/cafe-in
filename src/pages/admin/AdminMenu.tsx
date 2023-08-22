import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import withAuth from '../../components/adminMode/WithAuth';

function AdminMenu() {
	const navigate = useNavigate();

	return (
		<AdminMenuWrapper>
			<Logo aria-label="홈으로 이동하기" onClick={() => navigate('/')}>
				<img width={94} height={72} alt="서비스 로고" />
			</Logo>
			<AdminMenuBoxWrapper>
				<AdminMenuBox onClick={() => navigate('/admin/menu')}>메뉴 관리</AdminMenuBox>
				<AdminMenuBox onClick={() => navigate('/admin/waiting')}>대기 관리</AdminMenuBox>
				<AdminMenuBox onClick={() => navigate('/admin/orderhistory')}>주문 관리</AdminMenuBox>
				<AdminMenuBox onClick={() => navigate('/admin/sales')}>매출 관리</AdminMenuBox>
				<AdminMenuBox onClick={() => navigate('/admin/point')}>포인트 관리</AdminMenuBox>
				<AdminMenuBox onClick={() => navigate('/admin/theme')}>테마 및 색상</AdminMenuBox>
			</AdminMenuBoxWrapper>
		</AdminMenuWrapper>
	);
}

export default withAuth(AdminMenu);

const AdminMenuWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) =>
		theme.lightColor
			? theme.color === 'yellow'
				? theme.textColor.lightBeige
				: theme.textColor.white
			: theme.darkColor?.background};
	user-select: none;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
`;

const Logo = styled.button`
	margin-top: 68px;
	margin-bottom: 62px;
	img {
		content: ${({ theme }) =>
			theme.lightColor
				? theme.color === 'yellow'
					? 'url(/assets/logo_beige_small.svg)'
					: 'url(/assets/logo_small.svg)'
				: 'url(/assets/logo_dark_small.svg)'};
	}
`;

const AdminMenuBoxWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(auto, 1fr));
	width: 900px;
	height: 472px;
	grid-gap: 10px;
`;

const AdminMenuBox = styled.button`
	border-radius: 15px;
	width: 300px;
	height: 236px;
	border: 1px solid ${({ theme }) => (theme.lightColor ? theme.textColor.lightgray : 'none')};
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.background : theme.darkColor?.main)};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	text-align: center;
	line-height: 236px;
	font-size: ${({ theme }) => theme.fontSize['4xl']};
`;
