import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme, SelectedColorType } from './style/theme';
import { GlobalStyles } from './style/global';
import MenuList from './pages/user/MenuList';
import AdminLogin from './pages/admin/AdminLogin';
import AdminMenu from './pages/admin/AdminMenu';
import WaitingManagement from './pages/admin/WaitingManagement';
import ThemeManagement from './pages/admin/ThemeManagement';
import Waiting from './pages/user/Waiting';
import WaitingCheck from './pages/user/WaitingCheck';
import MenuManagement from './pages/admin/MenuManagement';
import OrderCheck from './pages/user/OrderCheck';
import NotFound from './pages/NotFound';
import OrderHistory from './pages/admin/OrderHistory';
import SalesList from './pages/admin/SalesList';
import PointList from './pages/admin/PointList';
import Thumbnail from './pages/Thumbnail';
import Start from './pages/user/Start';
import { selectedColorState } from './state/ColorState';
import { useSelectedColor } from './hooks/useSelectedColor';

function App() {
	const [isDarkmode, setIsDarkmode] = useState<boolean>(false);
	const selectedColor = useRecoilValue<SelectedColorType>(selectedColorState);

	useSelectedColor();

	const lightTheme = {
		color: selectedColor,
		fontSize: { ...defaultTheme.fontSize },
		fontWeight: { ...defaultTheme.fontWeight },
		textColor: { ...defaultTheme.textColor },
		lightColor: { ...defaultTheme.lightColor[selectedColor] },
	};

	useEffect(() => {
		const getDarkmode = localStorage.getItem('isDarkmode');
		if (getDarkmode) {
			setIsDarkmode(JSON.parse(getDarkmode));
		}
	}, []);

	return (
		<>
			<ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route path="/home/*" element={<Thumbnail />} />
						<Route path="/" element={<Thumbnail />} />
						<Route path="/start" element={<Start />} />
						<Route path="/*" element={<NotFound />} />
						<Route path="/menu" element={<MenuList />} />
						<Route path="/order" element={<OrderCheck />} />
						<Route path="/waiting" element={<Waiting />} />
						<Route path="/waitingcheck" element={<WaitingCheck />} />
						<Route path="/admin/login" element={<AdminLogin />} />
						<Route path="/admin/main" element={<AdminMenu />} />
						<Route path="/admin" element={<Navigate replace to="/admin/main" />} />
						<Route path="/admin/menu" element={<MenuManagement />} />
						<Route path="/admin/waiting/*" element={<WaitingManagement />} />
						<Route path="/admin/orderhistory" element={<OrderHistory />} />
						<Route
							path="/admin/theme"
							element={<ThemeManagement setIsDarkmode={setIsDarkmode} isDarkmode={isDarkmode} />}
						/>
						<Route path="/admin/sales" element={<SalesList />} />
						<Route path="/admin/point" element={<PointList />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
