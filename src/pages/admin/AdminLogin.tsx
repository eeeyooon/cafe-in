import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminLogin() {
	const navigate = useNavigate();

	const passwordRef = useRef<HTMLInputElement>(null);
	const [errorMesage, setErrorMessage] = useState('');

	const enterLogin = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleLogin();
		}
	};

	const handleLogin = async () => {
		setErrorMessage('');
		const useInputPwd = passwordRef.current?.value;

		if (!useInputPwd) return;

		const adminPwdRef = collection(db, 'adminPassword');
		const adminPwd = await getDocs(query(adminPwdRef, where('password', '==', useInputPwd)));
		if (adminPwd.docs.length === 0) {
			setErrorMessage('비밀번호가 일치하지 않습니다.');
			passwordRef.current.value = '';
			return;
		}
		passwordRef.current.value = '';
		localStorage.setItem('mode', 'admin');
		navigate('/admin/main');
	};

	return (
		<AdminLoginWrapper>
			<Link to="/">
				<img alt="카페인 로고" width="100" height="100" />
			</Link>
			<div>
				<h1>관리자 로그인</h1>
				<FormWrapper>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
						onKeyDown={enterLogin}
					>
						<label htmlFor="password">비밀번호</label>
						<input
							type="password"
							id="password"
							ref={passwordRef}
							placeholder="비밀번호를 입력해주세요."
							autoComplete="autoComplete"
						/>
					</form>
					{errorMesage && <p>{errorMesage}</p>}
					<button type="button" onClick={handleLogin}>
						로그인하기
					</button>
				</FormWrapper>
			</div>
		</AdminLoginWrapper>
	);
}

export default AdminLogin;

const AdminLoginWrapper = styled.div`
	user-select: none;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor.background)};
	img {
		position: absolute;
		top: 10px;
		left: 10px;
		content: ${({ theme }) => (theme.lightColor ? 'url(/assets/logo.png)' : 'url(/assets/logo_dark.png)')};
	}
	h1 {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};

		margin-bottom: 20px;
	}
`;

const FormWrapper = styled.div`
	width: 567px;
	height: 333px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.background : theme.darkColor.background)};
	border-radius: 15px;
	border: ${({ theme }) => theme.textColor.lightgray} 1px solid;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 100px;

	label {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: polygon(0 0, 0 0, 0 0);
	}

	input {
		width: 408px;
		height: 65px;
		padding-left: 14px;
		border-radius: 20px;
		border: ${({ theme }) => theme.textColor.lightgray} 1px solid;
		margin-bottom: 26px;

		&::placeholder {
			font-size: ${({ theme }) => theme.fontSize['2xl']};
			font-weight: ${({ theme }) => theme.fontWeight.bold};
		}
	}

	p {
		font-size: ${({ theme }) => theme.fontSize['lg']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		color: red;
		margin-bottom: 26px;
	}

	button {
		width: 175px;
		height: 54px;
		background-color: ${({ theme }) =>
			theme.lightColor
				? theme.color === 'blue' || theme.color === 'purple'
					? theme.lightColor.main
					: theme.lightColor.point
				: theme.darkColor.main};
		border-radius: 20px;
		color: ${({ theme }) => theme.textColor.white};
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
`;
