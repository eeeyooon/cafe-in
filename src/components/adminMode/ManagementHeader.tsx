import React, { ReactNode } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { darkTheme } from '../../style/theme';

type HeaderTextProps = {
	headerText: string;
	children?: ReactNode;
};

function ManagementHeader(props: HeaderTextProps) {
	const { headerText, children } = props;

	const navigate = useNavigate();

	const handleBackClick = () => {
		localStorage.setItem('isWaiting', JSON.stringify(true));
		navigate('/admin');
	};

	return (
		<ManagementHeaderWrapper>
			<IconWrapper onClick={handleBackClick} aria-label="뒤로가기">
				<img alt="뒤로가기 버튼" width={25} height={23} />
			</IconWrapper>
			<HeaderTitle className={children ? 'has-button' : ''}>{headerText}</HeaderTitle>
			{children}
		</ManagementHeaderWrapper>
	);
}

export default ManagementHeader;

const ManagementHeaderWrapper = styled.div`
	height: 80px;
	width: 1194px;
	padding-left: 33px;
	padding-right: 33px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: ${({ theme }) => theme.fontSize['4xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : darkTheme.darkColor.background)};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
`;

const IconWrapper = styled.button`
	img {
		content: ${({ theme }) =>
			theme.lightColor ? 'url(/assets/admin/back_light.svg)' : ' url(/assets/admin/back_dark.svg)'};
	}
`;

const HeaderTitle = styled.h1`
	width: 1101px;
	padding-right: 25px;
	display: flex;
	justify-content: center;
	&.has-button {
		padding-left: 280px;
	}
`;
