import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface WrappedPropsType {
	setIsDarkMode?: () => Element;
	isDarkmode?: boolean;
}

export default function withAuth<P extends WrappedPropsType>(Component: React.ComponentType<P>) {
	return function WithAuthComponent({ ...props }) {
		const navigate = useNavigate();
		const { pathname } = useLocation();
		useEffect(() => {
			const isAdminMode = localStorage.getItem('mode') === 'admin';
			if (!isAdminMode) navigate('/', { state: pathname.replace('/admin/', '') });
		}, [navigate, pathname]);
		return <Component {...(props as P)} />;
	};
}
