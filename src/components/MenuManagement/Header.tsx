import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import CategoryManagementModal from './CategoryManagementModal';
import ModalPortal from '../ModalPortal';
import AddMenuModal from './AddMenuModal';
import ManagementHeader from '../adminMode/ManagementHeader';
import HeaderButton from '../adminMode/HeaderButton';

function Header() {
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
	const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState<boolean>(false);

	const handleOpenCategoryModal = useCallback(() => {
		setIsCategoryModalOpen((prev) => !prev);
	}, []);

	const handleOpenAddMenuModal = useCallback(() => {
		setIsAddMenuModalOpen((prev) => !prev);
	}, []);

	return (
		<>
			<HeadWrapper>
				<ManagementHeader headerText="메뉴 관리">
					<ButtonContainer>
						<HeaderButton text="카테고리" decorate="is-selected" onClick={handleOpenCategoryModal} />
						<HeaderButton text="메뉴추가" decorate="is-selected" onClick={handleOpenAddMenuModal} />
					</ButtonContainer>
				</ManagementHeader>
			</HeadWrapper>
			{isCategoryModalOpen && (
				<ModalPortal>
					<CategoryManagementModal onClickToggleModal={handleOpenCategoryModal} />
				</ModalPortal>
			)}
			{isAddMenuModalOpen && (
				<ModalPortal>
					<AddMenuModal onClickToggleModal={handleOpenAddMenuModal} />
				</ModalPortal>
			)}
		</>
	);
}

export default Header;

const HeadWrapper = styled.header`
	display: flex;
	align-items: center;
`;

const ButtonContainer = styled.div`
	display: flex;
`;
