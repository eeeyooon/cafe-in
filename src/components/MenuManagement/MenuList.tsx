import React from 'react';
import styled from 'styled-components';

import MenuItem from '../MenuItem';
import { MenuType } from '../../types/menuMangementType';
import { useRecoilValue } from 'recoil';
import { selectedCategoryState } from '../../state/CategoryList';

interface ListPropType {
	list: MenuType[];
}

function MenuList({ list }: ListPropType) {
	const selectedCategory = useRecoilValue(selectedCategoryState);
	return (
		<MenuListWrapper>
			{list.filter((item) => item.category === selectedCategory)?.map((item) => <MenuItem key={item.id} menu={item} />)}
		</MenuListWrapper>
	);
}

export default MenuList;

const MenuListWrapper = styled.ul`
	padding: 40px 28px 45px 28px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 46px;
	grid-row-gap: 22px;
`;
