import React from 'react';
import MenuItem from '../../components/UserMode/MenuItem';
import SelectedItemContainer from '../../components/UserMode/SelectedItemContainer';
import { styled } from 'styled-components';
import MenuListHeader from '../../components/UserMode/MenuListHeader';

function MenuList() {
	return (
		<Layout>
			<MenuListHeader />
			<Main>
				<MenuListLayout>
					<MenuItem />
				</MenuListLayout>
				<SelectedItemContainer />
			</Main>
		</Layout>
	);
}

const Layout = styled.div`
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.lightbrown : theme.darkColor.background)};
	width: 1194px;
	height: 834px;
	user-select: none;
	overflow-y: hidden;
`;
const Main = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
`;

const MenuListLayout = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 8px;
	height: 700px;
	margin: 30px 0;
	overflow-y: auto;
	overflow-x: hidden;
	margin-right: 10px;
	padding-left: 10px;
	&::-webkit-scrollbar {
		display: none;
	}
	/* Firefox */
	scrollbar-width: none;
`;

export default MenuList;
