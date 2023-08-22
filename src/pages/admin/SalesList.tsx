import { useEffect, useState } from 'react';
import withAuth from '../../components/adminMode/WithAuth';
import { styled } from 'styled-components';
import ManagementHeader from '../../components/adminMode/ManagementHeader';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { changePriceFormat, changeYYMMDD } from '../../utils/changeFormat';
import { Order } from '../../types/Order';

interface totalOrder extends Order {
	totalOrderPay: number;
}

interface DaySalesData {
	date: string;
	totalPriceSum: number;
	orderCount: number;
}

function SalesList() {
	const currentDate = new Date();
	const todayDate = changeYYMMDD(currentDate);
	const [salesList, setSalesList] = useState<totalOrder[]>([]);
	const [daySalesData, setDaySalesData] = useState<DaySalesData[]>([]);
	const [displayDate, setDisplayDate] = useState(todayDate);
	const [targetYear, setTargetYear] = useState(currentDate.getFullYear());
	const [targetMonth, setTargetMonth] = useState(currentDate.getMonth() + 1);

	useEffect(() => {
		const getSales = async () => {
			const orderListCollection = collection(db, 'orderList');
			const salesDocs = await getDocs(orderListCollection);
			const salesDataList: totalOrder[] = [];
			salesDocs.forEach((doc) => {
				salesDataList.push({ ...(doc.data() as totalOrder) });
			});
			setSalesList(salesDataList);
		};

		getSales();
	}, []);

	// 같은 날짜 별로 데이터 그룹화하고 필요한 데이터만 저장
	useEffect(() => {
		const salesByDate: { [date: string]: { salesData: totalOrder[]; totalPriceSum: number } } = {};

		salesList.forEach((order) => {
			const date = changeYYMMDD(new Date(order.id));
			if (!salesByDate[date]) {
				salesByDate[date] = { salesData: [], totalPriceSum: 0 };
			}
			salesByDate[date].salesData.push(order);
			salesByDate[date].totalPriceSum += order.totalOrderPay;
		});

		const daySalesList: DaySalesData[] = [];

		for (const date in salesByDate) {
			const { salesData, totalPriceSum } = salesByDate[date];
			daySalesList.push({ date, totalPriceSum, orderCount: salesData.length });
		}

		setDaySalesData(daySalesList);
	}, [salesList]);

	const handlePreviousDay = () => {
		const currentDate = new Date(displayDate);
		currentDate.setDate(currentDate.getDate() - 1);
		const previousDate = changeYYMMDD(currentDate);
		setDisplayDate(previousDate);
	};

	const handleNextDay = () => {
		const currentDate = new Date(displayDate);
		currentDate.setDate(currentDate.getDate() + 1);
		const nextDate = changeYYMMDD(currentDate);
		setDisplayDate(nextDate);
	};

	const handleMonthChange = (nextMonth: boolean) => {
		let newTargetYear = targetYear;
		let newTargetMonth = targetMonth;

		if (nextMonth) {
			newTargetMonth += 1;
			if (newTargetMonth > 12) {
				newTargetMonth = 1;
				newTargetYear += 1;
			}
		} else {
			newTargetMonth -= 1;
			if (newTargetMonth < 1) {
				newTargetMonth = 12;
				newTargetYear -= 1;
			}
		}

		setTargetYear(newTargetYear);
		setTargetMonth(newTargetMonth);
	};

	//선택된 날짜에 해당하는 데이터 가져오기
	const dayData = daySalesData.filter((v) => v.date === displayDate);

	//선택된 달에 해당하는 데이터 가져오기
	const monthData = daySalesData.filter((data) => {
		const stringDate = data.date.split('-');
		const year = parseInt(stringDate[0]);
		const month = parseInt(stringDate[1]);

		return year === targetYear && month === targetMonth;
	});

	return (
		<SalesListWrapper>
			<ManagementHeader headerText="매출 내역 조회" />
			<SalesContent>
				<DailySalesWrapper>
					<p>
						<button aria-label="전 날 매출 보기" onClick={handlePreviousDay}>
							{'<'}
						</button>
						{dayData.length > 0 ? <span> {dayData[0].date} </span> : <span>{displayDate} </span>}
						<button aria-label="다음 날 매출 보기" onClick={handleNextDay}>
							{'>'}
						</button>
					</p>
					<SalesBoxWrapper>
						<SalesBox className="totalOrder">
							<p>주문 건 수</p>
							{dayData.length > 0 ? <p> {dayData[0].orderCount}건</p> : <p>0 건</p>}
						</SalesBox>
						<SalesBox>
							<p>총 매출 액</p>
							{dayData.length > 0 ? <p> {changePriceFormat(dayData[0].totalPriceSum.toString())}원</p> : <p>0원</p>}
						</SalesBox>
					</SalesBoxWrapper>
				</DailySalesWrapper>
				<MonthlySalesWrapper>
					<p>
						<button aria-label="지난 달 매출 보기" onClick={() => handleMonthChange(false)}>
							{'<'}
						</button>
						{targetMonth}월 매출
						<button aria-label="다음 달 매출 보기" onClick={() => handleMonthChange(true)}>
							{'>'}
						</button>
					</p>
					<SalesBoxWrapper>
						<SalesBox>
							<p>{targetMonth}월 매출</p>{' '}
							{monthData.length > 0 ? (
								<p> {changePriceFormat(monthData.reduce((sum, data) => sum + data.totalPriceSum, 0).toString())}원</p>
							) : (
								<p>0 원</p>
							)}
						</SalesBox>
					</SalesBoxWrapper>
				</MonthlySalesWrapper>
			</SalesContent>
		</SalesListWrapper>
	);
}

export default withAuth(SalesList);

const SalesListWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	user-select: none;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
`;

const SalesContent = styled.div`
	height: 754px;
	width: 934px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 100px;
	p {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
	}
`;

const SalesBoxWrapper = styled.div`
	height: 239px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;

	.totalOrder {
		margin-right: 46px;
	}
`;

const SalesBox = styled.div`
	width: 300px;
	height: 194px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.background : theme.darkColor.main)};
	border-radius: 10px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	line-height: 50px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	padding-top: 20px;
`;

const DailySalesWrapper = styled.div`
	width: 500px;
	height: 288px;
	text-align: center;

	> p {
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		padding-left: 5px;
		padding-right: 5px;
	}
`;

const MonthlySalesWrapper = styled.div`
	width: 300px;
	height: 288px;
	text-align: center;

	> p {
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		padding-left: 5px;
		padding-right: 5px;
	}
`;
