import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryListState, selectedCategoryState } from '../../state/CategoryList';
import { db } from '../../firebase/firebaseConfig';
import { deleteDoc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { menuListState } from '../../state/MenuListState';
import { CategoryType } from '../../types/menuMangementType';

interface CategoryItemPropType {
	categoryItem: CategoryType;
}
function CategoryItem({ categoryItem }: CategoryItemPropType) {
	const { id, category, isShowOptionModal } = categoryItem;
	const categoryListRef = collection(db, 'categoryList');
	const menuItemRef = collection(db, 'menuItem');

	const categoryList = useRecoilValue(categoryListState);
	const menuList = useRecoilValue(menuListState);
	const setSelectedCategory = useSetRecoilState(selectedCategoryState);

	const [editedCategoryName, setEditedCategoryName] = useState<string>('');
	const [editShowOptionModal, setEditShowOptionModal] = useState<boolean>(isShowOptionModal);
	const [selectedId, setSelectedId] = useState<number>(0);

	const checkDisabled = useCallback(
		(id: number) => {
			const currentCategory = categoryList.filter((category) => category.id === id)[0];
			const isContain = menuList.some((menu) => menu.category === currentCategory.category);
			return isContain;
		},
		[categoryList, menuList],
	);

	const handleRemoveCategory = useCallback(
		async (id: number) => {
			const data = await getDocs(query(categoryListRef, where('id', '==', id)));
			if (data.docs.length !== 0) {
				await deleteDoc(data.docs[0].ref);
			}
			setSelectedCategory(categoryList[0].category);
		},
		[categoryList, categoryListRef, setSelectedCategory],
	);

	const handleEditCategoryName = (e: ChangeEvent<HTMLInputElement>) => {
		setEditedCategoryName(e.target.value);
	};

	const handleClickEditButton = (id: number) => {
		setEditedCategoryName('');
		setSelectedId(id);
	};

	const handleStoreEdit = useCallback(
		async (id: number) => {
			if (!editedCategoryName.trim()) {
				setSelectedId(0);
				return;
			}
			const data = await getDocs(query(categoryListRef, where('id', '==', id)));
			if (data.docs.length !== 0) {
				await updateDoc(data.docs[0].ref, {
					category: editedCategoryName,
				});
			}

			const currentCategory = categoryList.filter((category) => category.id === id)[0].category;
			const editMenuListDoc = await getDocs(query(menuItemRef, where('category', '==', currentCategory)));
			if (editMenuListDoc.docs.length !== 0) {
				editMenuListDoc.docs.forEach(async (doc) => {
					await updateDoc(doc.ref, {
						category: editedCategoryName,
					});
				});
			}
			setSelectedId(0);
			setSelectedCategory(editedCategoryName);
		},
		[categoryList, categoryListRef, editedCategoryName, menuItemRef, setSelectedCategory],
	);

	const handleDeleteEdit = () => {
		setSelectedId(0);
	};

	const handleChangeOptionModal = async (value: boolean, id: number) => {
		setEditShowOptionModal((prev) => !prev);
		const data = await getDocs(query(categoryListRef, where('id', '==', id)));
		if (data.docs.length !== 0) {
			await updateDoc(data.docs[0].ref, {
				isShowOptionModal: value,
			});
		}
	};
	return (
		<>
			<CategoryItemWrapper data-id={id}>
				<label htmlFor={`${category}-option-checkbox`}>옵션 체크박스</label>
				<input
					type="checkbox"
					id={`${category}-option-checkbox`}
					checked={editShowOptionModal}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						handleChangeOptionModal(e.currentTarget.checked, id);
					}}
				/>
				{id === selectedId ? (
					<>
						<label htmlFor="editCategoryName">수정할 카테고리 이름</label>
						<input
							type="text"
							id="editCategoryName"
							placeholder={category}
							value={editedCategoryName}
							onChange={handleEditCategoryName}
						/>
						<EditCategoryButton
							type="button"
							onClick={() => {
								handleStoreEdit(id);
							}}
						>
							저장
						</EditCategoryButton>
						<button type="button" onClick={handleDeleteEdit}>
							취소
						</button>
					</>
				) : (
					<>
						<span>{category}</span>
						<EditCategoryButton type="button" onClick={() => handleClickEditButton(id)}>
							수정
						</EditCategoryButton>
						<button
							type="button"
							disabled={checkDisabled(id) ? true : false}
							onClick={() => {
								handleRemoveCategory(id);
							}}
						>
							삭제
						</button>
					</>
				)}
			</CategoryItemWrapper>
		</>
	);
}

export default CategoryItem;

const CategoryItemWrapper = styled.li`
	display: flex;
	align-items: center;

	label {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: polygon(0 0, 0 0, 0 0);
	}

	input[type='checkbox'] {
		width: 20px;
		height: 20px;
		accent-color: ${({ theme }) =>
			theme.lightColor
				? theme.color === 'blue'
					? theme.lightColor.sub
					: theme.lightColor.point
				: theme.darkColor.main};
	}

	span,
	input {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 191px;
		height: 57px;
		background-color: ${({ theme }) => theme.textColor.white};
		margin-right: 16px;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		border-radius: 10px;
		padding-left: 10px;
		border: none;
	}

	button {
		width: 83px;
		height: 57px;
		background-color: ${({ theme }) =>
			theme.lightColor
				? theme.color === 'green'
					? theme.lightColor.sub
					: theme.lightColor.main
				: theme.darkColor.main};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};

		&:disabled {
			cursor: not-allowed;
			color: ${({ theme }) => theme.textColor.white};
			background-color: ${({ theme }) => theme.textColor.darkgray};
		}
	}
`;

const EditCategoryButton = styled.button`
	margin-right: 3px;
`;
