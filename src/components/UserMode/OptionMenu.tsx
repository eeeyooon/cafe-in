import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Option } from '../../types/OptinalState';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Item } from '../../types/Category';
import { selectedItemsState } from '../../firebase/FirStoreDoc';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { takeOutState } from '../../state/TakeOut';
export interface OptionMenuProps {
	clickedItem: Item | null;
	onClickToggleModal: () => void;
}

function OptionMenu({ clickedItem, onClickToggleModal }: OptionMenuProps) {
	const [options, setOptions] = useState<{ [key: string]: Option[] }>({});
	const [activeOptions, setActiveOptions] = useState<string[]>([]);
	const setSelectedItems = useSetRecoilState(selectedItemsState);
	const [selectedItemOptions, setSelectedItemOptions] = useState<Option[]>([]);
	const takeOut = useRecoilValue(takeOutState);
	useEffect(() => {
		const fetchOptions = async () => {
			const optionsCollection = collection(db, 'options');
			const optionsSnapshot = await getDocs(optionsCollection);

			if (optionsSnapshot.docs.length > 0) {
				const fetchedOptions = optionsSnapshot.docs[0].data() as { [key: string]: Option[] };

				const customOrder = ['추가선택', '농도선택'];
				const orderedOptions: { [key: string]: Option[] } = {};
				customOrder.forEach((key) => {
					if (key in fetchedOptions) {
						orderedOptions[key] = fetchedOptions[key];
					}
				});
				setOptions(orderedOptions);
			}
		};
		setSelectedItemOptions([]);
		fetchOptions();
	}, [clickedItem]);

	const handleOptionClick = (e: React.MouseEvent, option: Option) => {
		e.preventDefault();

		if (selectedItemOptions.some((selectedOption) => selectedOption.name === option.name)) {
			setSelectedItemOptions((oldSelectedOptions) =>
				oldSelectedOptions.filter((selectedOption) => selectedOption.name !== option.name),
			);
			setActiveOptions((oldActiveOptions) => oldActiveOptions.filter((activeOption) => activeOption !== option.name));
		} else {
			setSelectedItemOptions((oldSelectedOptions: Option[]) => [...oldSelectedOptions, option]);
			setActiveOptions((oldActiveOptions) => [...oldActiveOptions, option.name]);
		}
	};
	const addOrUpdateSelectedItem = () => {
		const sortedOptions = [...selectedItemOptions].sort((a, b) => a.name.localeCompare(b.name));
		const optionsStr = sortedOptions.length ? sortedOptions.map((o) => o.name).join(', ') : '없음';
		const additionalPrice = sortedOptions.reduce((acc, option) => acc + option.price, 0);

		const newItem = {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			...clickedItem!,
			options: optionsStr,
			takeOut: takeOut,
			totalPrice: (clickedItem?.price || 0) + additionalPrice,
			quantity: 1,
			imageUrl: clickedItem?.imageUrl,
		};

		setSelectedItems((prev) => {
			const existingItemIndex = prev.findIndex(
				(item) => item.name === newItem.name && item.options === newItem.options,
			);

			if (existingItemIndex >= 0) {
				const updatedItem = {
					...prev[existingItemIndex],
					quantity: prev[existingItemIndex].quantity + 1,
				};
				const updatedItems = [...prev.slice(0, existingItemIndex), updatedItem, ...prev.slice(existingItemIndex + 1)];
				return updatedItems;
			} else {
				return [...prev, newItem];
			}
		});
	};
	const handleCloseBtnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		addOrUpdateSelectedItem();
		onClickToggleModal();
	};
	return (
		<ModalContainer onClick={onClickToggleModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<h1>원하는 옵션을 선택해주세요</h1>
				<Layout>
					{Object.entries(options).map(([category, options]) => (
						<CheckMenuContainer key={category} onClick={() => handleOptionClick}>
							<p className="category">{category}</p>
							<div>
								{options.map((option: Option) => (
									<CheckOption
										key={option.name}
										onClick={(e) => handleOptionClick(e, option)}
										className={activeOptions.includes(option.name) ? 'active' : ''}
									>
										<p>{option.name}</p>
										<p>{option.price === 0 ? '+0' : `+${option.price}원`}</p>
									</CheckOption>
								))}
							</div>
						</CheckMenuContainer>
					))}
				</Layout>
				<CloseBtn onClick={(e) => handleCloseBtnClick(e)}>담기</CloseBtn>
			</DialogBox>
			<Backdrop
				onClick={(e: React.MouseEvent) => {
					e.preventDefault();
					if (onClickToggleModal) {
						onClickToggleModal();
					}
				}}
			/>
		</ModalContainer>
	);
}

const ModalContainer = styled.div`
	width: 100%;
	height: 100%;
`;
const Layout = styled.div`
	width: 100%;
	padding-left: 40px;
	padding-right: 40px;
	padding-bottom: 20px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
`;
const DialogBox = styled.dialog`
	width: 600px;
	height: 550px;
	position: absolute;
	top: 80px;
	left: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: none;
	border-radius: 10px;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	box-sizing: border-box;
	z-index: 10000;
	h1 {
		width: 100%;
		text-align: center;
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		padding: 25px;
		border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	}
`;
const CheckMenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding-top: 20px;
	.category {
		margin: 10px 0;
		font-size: ${({ theme }) => theme.fontSize['xl']};
	}
`;
const CheckOption = styled.button`
	background-color: ${({ theme }) => theme.textColor.lightgray};
	border-radius: 10px;
	width: 120px;
	height: 120px;
	margin-right: 10px;
	p {
		padding: 20px;
	}
	&:active {
		background-image: url('/assets/user/check.svg');
		background-repeat: no-repeat;
		background-position: center;
	}
	&.active {
		background-image: url('/assets/user/check.svg');
		background-repeat: no-repeat;
		background-position: center;
	}
`;
const CloseBtn = styled.button`
	margin-top: 20px;
	border-radius: 10px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.sub : theme.darkColor.sub)};
	width: 110px;
	height: 45px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
`;
const Backdrop = styled.div`
	width: 1194px;
	height: 834px;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0); /* 추가 */
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.2);
`;
export default OptionMenu;
