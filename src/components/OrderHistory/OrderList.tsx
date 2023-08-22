import React from 'react';
import styled from 'styled-components';
import OrderItem from './OrderItem';
import { OrderListItemType, OrderListType } from '../../types/orderHistoryType';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { changeDateFormat } from '../../utils/changeFormat';

interface OrderListPropType {
	order: OrderListType;
	isProgressMode: boolean;
}
function OrderList({ order, isProgressMode }: OrderListPropType) {
	const orderRef = collection(db, 'orderList');

	const timeFormat = (id: number) => {
		const { hour, minute, sec } = changeDateFormat(id);
		const strHour = hour.toString().padStart(2, '0');
		const strMin = minute.toString().padStart(2, '0');
		const strSec = sec.toString().padStart(2, '0');

		return `${strHour}:${strMin}:${strSec}`;
	};

	const handleToggleComplete = async (id: number, checked: boolean) => {
		const orderDocs = await getDocs(query(orderRef, where('id', '==', order.id)));
		if (orderDocs.docs.length !== 0) {
			const docData = orderDocs.docs[0].data();
			docData.list[id].isComplete = checked;
			await updateDoc(orderDocs.docs[0].ref, {
				...docData,
			});
		}
	};

	const handleComplete = async () => {
		const orderDocs = await getDocs(query(orderRef, where('id', '==', order.id)));
		if (orderDocs.docs.length !== 0) {
			const docData = orderDocs.docs[0].data();
			docData.list.map((item: OrderListItemType) => (item.isComplete = true));
			await updateDoc(orderDocs.docs[0].ref, {
				...docData,
				progress: '완료주문',
			});
		}
	};

	return (
		<>
			<OrderListWrapper key={order.id}>
				<OrderInfo>
					<span>{order.takeOut ? '포장' : '매장'}</span>
					<span>{timeFormat(order.id)}</span>
				</OrderInfo>
				<ItemWrapper $isProgressMode={isProgressMode}>
					{order.list.map((item, idx) => (
						<OrderItem
							key={`${order.id}${idx}`}
							idx={idx}
							itemInfo={item}
							time={order.id}
							toggleComplete={handleToggleComplete}
						/>
					))}
				</ItemWrapper>
				{isProgressMode && (
					<button type="button" onClick={handleComplete}>
						제조완료
					</button>
				)}
			</OrderListWrapper>
		</>
	);
}

export default OrderList;

const OrderListWrapper = styled.li`
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.background : theme.darkColor.background)};
	width: 350px;
	height: 560px;
	border-radius: 10px;
	padding: 20px 0 0 16px;
	border: ${({ theme }) => (theme.lightColor ? 'none' : theme.textColor.white)} 1px solid;

	button {
		width: 130px;
		height: 50px;
		border-radius: 10px;
		background-color: ${({ theme }) =>
			theme.lightColor
				? theme.color === 'green'
					? theme.lightColor.sub
					: theme.lightColor.main
				: theme.darkColor.main};
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		margin-left: 90px;
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	}
`;

const OrderInfo = styled.div`
	margin-bottom: 30px;
	font-size: ${({ theme }) => theme.fontSize['4xl']};
	color: ${({ theme }) => (theme.lightColor ? 'none' : theme.textColor.white)};
	display: flex;
	align-items: center;

	span:first-child {
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		margin-right: 11px;
	}

	span:last-child {
		font-size: ${({ theme }) => theme.fontSize['xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
	}
`;
const ItemWrapper = styled.ul<{ $isProgressMode: boolean }>`
	width: 318px;
	height: ${({ $isProgressMode }) => ($isProgressMode ? '380px' : '460px')};
	margin-bottom: 19px;
	overflow-y: auto;
	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;
