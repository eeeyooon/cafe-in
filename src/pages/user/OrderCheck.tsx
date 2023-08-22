import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import AddPointModal from '../../components/UserMode/AddPointModal';
import UsePointUser from '../../components/UserMode/UsePointUser';
import { defaultTheme } from '../../style/theme';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useRecoilState } from 'recoil';
import { usedPointsState } from '../../state/PointState';
import { orderListStateAtom } from '../../state/OrderListAtom';
import Toast from '../../components/adminMode/Toast';
import ModalPortal from '../../components/ModalPortal';
import { changePriceFormat } from '../../utils/changeFormat';

function OrderCheck() {
	const navigate = useNavigate();
	const theme = useTheme();
	const [usedPoints, setUsedPoints] = useRecoilState(usedPointsState);
	const [orderList, setOrderList] = useRecoilState(orderListStateAtom);
	const [isOpenAddPointModal, setAddPointModalOpen] = useState<boolean>(false);
	const [isOpenUsePointUserModal, setUsePointUserModalOpen] = useState<boolean>(false);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const toggleModal = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
		modalSetter((prevState) => !prevState);
	};

	const onClickToggleAddPointModal = toggleModal(setAddPointModalOpen);
	const onClickToggleUsePointUserModal = toggleModal(setUsePointUserModalOpen);

	const computeTotalOrderAmount = () =>
		orderList.reduce((acc, order) => acc + order.list.reduce((orderAcc, item) => orderAcc + item.totalPrice, 0), 0);

	const handleDeleteAll = () => {
		setOrderList([]);
		setUsedPoints(0);
	};

	const handlePayment = async () => {
		const ordersToUpdate = orderList.filter((order) => order.progress === '주문완료');

		for (const order of ordersToUpdate) {
			const orderCollectionRef = collection(db, 'orderList');

			await addDoc(orderCollectionRef, { ...order, progress: '진행중', totalOrderPay });
		}

		setOrderList((prevOrders) =>
			prevOrders.map((order) => (order.progress === '주문완료' ? { ...order, progress: '진행중' } : order)),
		);
		setToastMessage('결제되었습니다');
		// 상태 초기화
		setOrderList([]); // 주문 목록 초기화

		setUsedPoints(0); // 사용된 포인트 초기화
	};
	useEffect(() => {
		if (toastMessage) {
			const timer = setTimeout(() => {
				setToastMessage(null);
			}, 2000); // 3초 후에 실행

			return () => clearTimeout(timer);
		}
	}, [toastMessage]);
	const totalOrderPay = computeTotalOrderAmount();
	const TotalOrderPrice = totalOrderPay - (usedPoints || 0);

	return (
		<Layout>
			<Header>
				<BackBTn
					onClick={() => {
						handleDeleteAll();
						navigate('/menu');
					}}
				>
					<img
						className="backBtn"
						src={theme.lightColor ? '/assets/user/BackBtn_light.svg' : '/assets/user/BackBtn_dark.svg'}
						alt="메뉴페이지"
					/>
				</BackBTn>
				<h1>주문 내역 확인</h1>
			</Header>
			<Container>
				<OrderList>
					<TableHead>
						<li>상품명 </li>
						<li>수량 </li>
						<li>주문금액 </li>
					</TableHead>
					<Tbody>
						{orderList
							.filter((order) => order.progress === '주문완료')
							.map((order) => (
								<div key={order.id}>
									{order.list.map((item, index) => (
										<OrderMenuItem key={index}>
											<div className="products-name">
												<img src={item.imgUrl} alt="제품이미지" width={42} height={42} />
												<p className="name">{item.menu}</p>
											</div>
											<p>{item.quantity}</p>
											<p>{item.totalPrice.toLocaleString()}원</p>
										</OrderMenuItem>
									))}
								</div>
							))}
					</Tbody>
				</OrderList>
				<OrderTotalPriceContainer>
					<TotalPrice>
						<div>
							<h2>주문금액</h2>
							<p>{changePriceFormat(String(totalOrderPay))}원</p>
						</div>
						<div>
							<h2>포인트 사용</h2>
							<p>- {usedPoints?.toLocaleString() ?? '0'}원</p>
						</div>
						<div>
							<h2>총 결제 금액</h2>
							<p>{changePriceFormat(String(TotalOrderPrice))}원</p>
						</div>
					</TotalPrice>

					<Payment>
						<div className="point">
							<button className="add-point" onClick={onClickToggleAddPointModal}>
								포인트 적립
							</button>
							<button className="use-point" onClick={onClickToggleUsePointUserModal}>
								포인트 사용
							</button>
							{isOpenAddPointModal && <AddPointModal onClickToggleModal={onClickToggleAddPointModal} />}
							{isOpenUsePointUserModal && <UsePointUser onClickToggleModal={onClickToggleUsePointUserModal} />}
						</div>
						<button
							className="payment"
							onClick={() => {
								handlePayment();
								setTimeout(() => {
									navigate('/');
								}, 3000);
							}}
						>
							결제하기
							<img src="/assets/user/buy.svg" alt="결제하기" />
						</button>
						{toastMessage && (
							<ModalPortal>
								<Toast text={toastMessage} />
							</ModalPortal>
						)}
					</Payment>
				</OrderTotalPriceContainer>
			</Container>
		</Layout>
	);
}
const Layout = styled.div`
	width: 1194px;
	height: 100%;
	position: relative;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor.background)};
	overflow-y: hidden;
	user-select: none;
`;
const Header = styled.div`
	display: flex;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	padding: 10px;
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};

	h1 {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
	}
`;
const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	height: 100%;
	padding: 20px 0;
	margin: 0 20px;
`;
const TableHead = styled.ul`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 69px;
	border-radius: 10px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.lightgray : theme.textColor.lightbrown)};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	font-size: ${({ theme }) => theme.fontSize.xl};
`;
const Tbody = styled.ul`
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.background : 'none')};
	border: ${({ theme }) => (theme.lightColor ? 'none' : `1px solid ${theme.textColor.white}`)};
	border-radius: 10px;
	height: 650px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	margin-top: 10px;
	padding-top: 20px;
	overflow-y: auto;
	.name {
		display: flex;
		justify-content: center;
		flex: 1;
		align-items: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: 200px;
		padding-left: 10px;
	}
	&::-webkit-scrollbar {
		display: none;
	}
	/* Firefox */
	scrollbar-width: none;
`;
const OrderMenuItem = styled.li`
	display: flex;
	align-items: center;
	background-color: ${({ theme }) => (theme.lightColor ? defaultTheme.textColor.white : theme.textColor.lightbrown)};
	margin: 10px 25px;
	padding: 10px;
	border-radius: 10px;
	div,
	p {
		display: flex;
		justify-content: center;
		flex: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.products-name {
		display: flex;
		align-items: center;
		img {
			margin-right: 5px;
			border-radius: 5px;
		}
	}
`;
const OrderList = styled.div`
	width: 583px;
	height: 100%;
	margin: 0 40px;
`;
const BackBTn = styled.button`
	:active {
		background-color: ${({ theme }) => theme.textColor.lightgray};
		border-radius: 10px;
	}
`;
const OrderTotalPriceContainer = styled.div`
	flex-grow: 1;
	height: 100%;
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
`;
const TotalPrice = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 380px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	margin-top: 10px;
	padding-bottom: 100px;
	div {
		display: flex;
		justify-content: space-between;
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		font-size: ${({ theme }) => theme.fontSize['4xl']};
	}
`;
const Payment = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 50px;
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	font-size: ${({ theme }) => theme.fontSize['xl']};
	.add-point {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 230px;
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.sub : theme.darkColor?.sub)};
		height: 120px;
		border-radius: 10px;
		margin-bottom: 40px;
	}
	.payment {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 230px;
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.sub : theme.darkColor?.sub)};
		border-radius: 10px;

		img {
			position: absolute;
			bottom: 0;
			object-fit: cover;
		}
	}
	.use-point {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 230px;
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.sub : theme.darkColor?.sub)};
		height: 120px;
		border-radius: 10px;
	}
`;
export default OrderCheck;
