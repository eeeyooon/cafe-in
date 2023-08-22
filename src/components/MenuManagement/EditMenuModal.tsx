import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ModalInput from './ModalInput';
import { MenuType } from '../../types/menuMangementType';
import { db } from '../../firebase/firebaseConfig';
import { getDocs, query, where, updateDoc, collection } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import ModalPortal from '../ModalPortal';
import DeleteModal from './DeleteModal';

interface EditModalPropType {
	menu: MenuType;
	onCloseModal: () => void;
}
function EditMenuModal({ menu, onCloseModal }: EditModalPropType) {
	const backgroundRef = useRef<HTMLDivElement>(null);
	const [menuInfo, setMenuInfo] = useState<MenuType>(menu);
	const [file, setFile] = useState<File>();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

	const menuItemRef = collection(db, 'menuItem');
	const storage = getStorage();

	const storeImg = async () => {
		if (!file) return;
		const imageRef = storageRef(storage, `images/${menuInfo.imageName}`);
		const snapshot = await uploadBytes(imageRef, file);
		const url = await getDownloadURL(snapshot.ref);
		return url;
	};

	const handleEditMenu = async () => {
		const imageUrl = await storeImg();
		const menuData = await getDocs(query(menuItemRef, where('id', '==', menuInfo.id)));
		if (menuData.docs.length !== 0) {
			await updateDoc(menuData.docs[0].ref, {
				id: menuInfo.id,
				name: menuInfo.name,
				price: menuInfo.price,
				category: menuInfo.category,
				imageName: menuInfo.imageName,
				imageUrl: imageUrl ? imageUrl : menuInfo.imageUrl,
				soldout: menuInfo.soldout,
			});
		}
		onCloseModal();
	};

	const handleRemoveMenu = () => {
		console.log('delete menu');
		setIsDeleteModalOpen(true);
	};

	const handleDeleteEdit = () => {
		setMenuInfo(menu);
		onCloseModal();
	};

	const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === backgroundRef.current) {
			onCloseModal();
		}
	};
	return (
		<>
			<EditModalWrapper ref={backgroundRef} onClick={handleClickOutside}>
				<EditModalContent>
					<ModalInput menuInfo={menu} setMenuState={setMenuInfo} setFile={setFile} />
					<div>
						<Button type="button" onClick={handleEditMenu}>
							수정
						</Button>
						<Button type="button" onClick={handleRemoveMenu}>
							삭제
						</Button>
						<Button type="button" onClick={handleDeleteEdit}>
							취소
						</Button>
					</div>
				</EditModalContent>
			</EditModalWrapper>
			{isDeleteModalOpen && (
				<ModalPortal>
					<DeleteModal menu={menuInfo} setIsDeleteModalOpen={setIsDeleteModalOpen} onCloseModal={onCloseModal} />
				</ModalPortal>
			)}
		</>
	);
}

export default EditMenuModal;

const EditModalWrapper = styled.div`
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

const EditModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 896px;
	height: 586px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.background : theme.textColor.black)};
	padding-top: 58px;
	border-radius: 10px;
`;

const Button = styled.button`
	width: 146px;
	height: 57px;
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.regular};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.sub : theme.darkColor?.main)};

	&:not(:last-child) {
		margin-right: 24px;
	}
`;
