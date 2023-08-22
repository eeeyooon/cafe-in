import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { MenuType } from '../types/menuMangementType';
import EditMenuModal from './MenuManagement/EditMenuModal';
import ModalPortal from './ModalPortal';
import { changePriceFormat } from '../utils/changeFormat';

interface ItemPropType {
	menu: MenuType;
}
function MenuItem({ menu }: ItemPropType) {
	const [isOpenModal, setModalOpen] = useState<boolean>(false);

	const onClickToggleModal = useCallback(() => {
		setModalOpen(!isOpenModal);
	}, [isOpenModal]);

	return (
		<>
			<MenuItemWrapper>
				<button onClick={onClickToggleModal}>
					{menu.imageUrl ? (
						<img src={menu.imageUrl} alt={`${menu.name}이미지`} width={218} height={204} />
					) : (
						<div>이미지 없음</div>
					)}
					<p className="menu-name"> {menu.name}</p>
					<p className="menu-price">{changePriceFormat(menu.price)}원</p>
				</button>
			</MenuItemWrapper>
			{isOpenModal && (
				<ModalPortal>
					<EditMenuModal menu={menu} onCloseModal={onClickToggleModal} />
				</ModalPortal>
			)}
		</>
	);
}

export default MenuItem;

const MenuItemWrapper = styled.li`
	background-color: ${({ theme }) => theme.textColor.white};
	border: 1px solid ${({ theme }) => theme.textColor.lightgray};
	border-radius: 15px;
	width: 250px;
	height: 300px;

	button {
		width: 100%;
		height: 100%;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img {
		margin-top: 10px;
		width: 218px;
		height: 204px;
		object-fit: cover;
		border-radius: 10px;
	}

	div {
		width: 218px;
		height: 204px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: ${({ theme }) => theme.fontSize['xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		background-color: ${({ theme }) => theme.textColor.white};
	}

	.menu-name {
		margin: 17px 0 7px 0;
		font-size: ${({ theme }) => theme.fontSize['xl']};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}

	p {
		font-size: ${({ theme }) => theme.fontSize.lg};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}
`;
