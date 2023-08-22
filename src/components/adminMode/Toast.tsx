import React from 'react';
import { styled } from 'styled-components';

interface ToastPropTypes {
	text: string;
}

function Toast({ text }: ToastPropTypes) {
	return <ToastWrapper>{text}</ToastWrapper>;
}

export default Toast;

const ToastWrapper = styled.div`
	width: 340px;
	padding: 16px;
	position: absolute;
	word-spacing: 5px;
	left: 50%;
	top: 38px;
	transform: translateX(-170px);
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.sub : theme.darkColor.main)};
	border-radius: 20px;
	color: ${({ theme }) => theme.textColor.white};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	font-size: ${({ theme }) => theme.fontSize['lg']};
	z-index: 10000;
`;
