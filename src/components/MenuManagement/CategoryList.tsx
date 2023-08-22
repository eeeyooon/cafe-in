import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryListState, selectedCategoryState } from '../../state/CategoryList';

function CategoryList() {
	const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
	const categoryList = useRecoilValue(categoryListState);

	const handleSelectCategory = (e: MouseEvent) => {
		const categoryName = e.currentTarget;
		if (categoryName.textContent) setSelectedCategory(categoryName.textContent);
	};
	return (
		<NavWrapper>
			<ul>
				{categoryList.map(({ id, category }) => (
					<li key={id} className={selectedCategory === category ? 'is-selected' : ''}>
						<button type="button" onClick={handleSelectCategory}>
							{category}
						</button>
					</li>
				))}
			</ul>
		</NavWrapper>
	);
}

export default CategoryList;

export const NavWrapper = styled.nav`
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor.background)};
	height: 60px;
	ul {
		width: 1144px;
		display: flex;
		align-items: center;
		overflow-y: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	button {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		width: 100%;
		height: 60px;
		margin: 0 20px;
		word-break: keep-all;
	}

	li.is-selected button {
		color: ${({ theme }) =>
			theme.lightColor
				? theme.color === 'blue'
					? theme.lightColor.main
					: theme.lightColor.point
				: theme.darkColor.main};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}
`;
