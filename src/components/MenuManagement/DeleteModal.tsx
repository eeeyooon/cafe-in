import React, { Dispatch, SetStateAction, useRef } from 'react';
import { styled } from 'styled-components';
import { db } from '../../firebase/firebaseConfig';
import { getDocs, query, where, collection, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';
import { MenuType } from '../../types/menuMangementType';
interface DeletePropType {
	menu: MenuType;
	setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
	onCloseModal: () => void;
}
function DeleteModal({ menu, setIsDeleteModalOpen, onCloseModal }: DeletePropType) {
	const backgroundRef = useRef<HTMLDivElement>(null);
	const menuItemRef = collection(db, 'menuItem');
	const storage = getStorage();

	const removeImg = async () => {
		const deleteRef = storageRef(storage, `images/${menu.imageName}`);
		deleteObject(deleteRef)
			.then(() => {
				return true;
			})
			.catch(() => {
				alert('이미지 삭제에 실패했습니다.');
				return;
			});
	};

	const handleRemoveItem = async () => {
		const menuData = await getDocs(query(menuItemRef, where('id', '==', menu.id)));
		if (menuData.docs.length !== 0) {
			await removeImg();
			await deleteDoc(menuData.docs[0].ref);
		}
		onCloseModal();
	};

	const handleCancelRemove = () => {
		setIsDeleteModalOpen(false);
	};

	const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === backgroundRef.current) {
			onCloseModal();
		}
	};
	return (
		<DeleteModalWrapper ref={backgroundRef} onClick={handleClickOutside}>
			<DeleteContent>
				<p>{`${menu.name}을 삭제하시겠습니까?`}</p>
				<div>
					<button type="button" onClick={handleRemoveItem}>
						삭제
					</button>
					<button type="button" onClick={handleCancelRemove}>
						취소
					</button>
				</div>
			</DeleteContent>
		</DeleteModalWrapper>
	);
}

export default DeleteModal;

const DeleteModalWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: rgba(0, 0, 0, 0.2);
	position: fixed;
	left: 50%;
	top: 0;
	transform: translateX(-597px);
	display: flex;
	align-items: center;
	justify-content: center;
`;
const DeleteContent = styled.div`
	width: 896px;
	height: 586px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.textColor.black)};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;

	p {
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		margin-bottom: 53px;
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	}

	button {
		width: 146px;
		height: 57px;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.sub : theme.darkColor?.main)};
		border-radius: 10px;

		&:first-child {
			margin-right: 16px;
		}
	}
`;
