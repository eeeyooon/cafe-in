import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { defaultTheme } from '../../style/theme';
import { db } from '../../firebase/firebaseConfig';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { categoriesState, selectedCategoryState } from '../../state/CategoryList';
import { selectedItemsState } from '../../firebase/FirStoreDoc';

function MenuListHeader() {
	const setCategory = useSetRecoilState(selectedCategoryState);
	const [activeBtn, setActiveBtn] = useState<string>('');
	const [categories, setCategories] = useRecoilState(categoriesState);
	const setSelectedItems = useSetRecoilState(selectedItemsState);

	const navigate = useNavigate();
	const theme = useTheme();
	useEffect(() => {
		const loadCategories = async () => {
			const categoryQuery = query(collection(db, 'categoryList'), orderBy('id', 'asc'));
			const querySnapshot = await getDocs(categoryQuery);
			const loadedCategories = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				category: doc.data().category,
				isShowOptionModal: doc.data().isShowOptionModal,
			}));

			setCategories(loadedCategories);

			// 첫 번째 카테고리 (커피)를 기본으로 설정
			if (loadedCategories.length > 0) {
				setActiveBtn(loadedCategories[0].category); // 첫 번째 카테고리로 activeBtn 설정
				setCategory(loadedCategories[0].category);
			}
		};
		loadCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onCategoryClick = (category: string) => {
		setActiveBtn(category); // activeBtn 상태 업데이트
		setCategory(category);
	};
	const setSelectedCategory = useSetRecoilState(selectedCategoryState);

	const handleLogoClick = () => {
		setSelectedCategory(''); // 또는 null 등 초기화
	};

	const deletedSelectedItem = () => {
		setSelectedItems([]);
	};
	return (
		<Layout>
			<li>
				<h1 onClick={handleLogoClick}>
					<img src={theme.lightColor ? '/assets/logo.png' : '/assets/logo_dark.png'} alt="cafe-in" width={90} />
				</h1>
			</li>
			{categories.map((category) => (
				<li key={category.id}>
					<TabButton $isActive={activeBtn === category.category} onClick={() => onCategoryClick(category.category)}>
						{category.category}
					</TabButton>
				</li>
			))}
			<li>
				<button>
					<img
						src="/assets/user/home_light.svg"
						alt="Home"
						width={30}
						onClick={() => {
							deletedSelectedItem();
							navigate('/');
						}}
					/>
				</button>
			</li>
		</Layout>
	);
}
//prettier-ignore
const TabButton = styled.button<{ $isActive: boolean }>`
color: ${({ theme, $isActive }) => 
    $isActive 
        ? (theme.color === 'blue'
            ? defaultTheme.lightColor.blue.main 
            : theme.lightColor 
                ? theme.lightColor.point 
                : theme.darkColor.point)
        : (theme.lightColor ? theme.textColor.black : theme.textColor.lightgray)
};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	padding: 10px 30px;
	width: fit-content;
	border: none;
	border-radius: 10px;
	cursor: pointer;
`;
const Layout = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 83px;
	padding: 0 30px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor.background)};
	overflow-x: auto;
	white-space: nowrap;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export default MenuListHeader;
