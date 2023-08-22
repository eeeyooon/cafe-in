import React, { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import WaitingItem from './WaitingItem';
import { WaitingDataType } from '../../types/waitingDataType';
import { filterTodayWaiting } from '../../utils/filter';
import { isWaitingAvailableState } from '../../state/WaitingState';

interface ThProps {
	width?: string;
}

type waitingDataProps = {
	waitingDataStatus: string;
};

const WaitingTableBox = (props: waitingDataProps) => {
	const { waitingDataStatus } = props;
	const [waitingList, setWaitingList] = useState<WaitingDataType[]>([]);
	const isWaitingAvailable = useRecoilValue<boolean>(isWaitingAvailableState);

	useEffect(() => {
		const waitingCollectionRef = collection(db, 'waitingList');
		const getWaitingList = onSnapshot(waitingCollectionRef, (snapshot) => {
			const data: WaitingDataType[] = [];
			snapshot.forEach((doc) => {
				data.push({
					id: doc.id,
					...(doc.data() as WaitingDataType),
				});
			});
			setWaitingList(data);
		});
		return () => getWaitingList();
	}, []);

	const waitingInfo = filterTodayWaiting(waitingList, waitingDataStatus);
	const todayWaitingNum = useMemo(() => waitingInfo.length, [waitingInfo]);

	const MemoizedWaitingItem = React.memo(WaitingItem);
	const MemoizedTableMesesage = React.memo(TableMesesage);

	return (
		<TableBox>
			<table>
				<thead>
					<TableHeader>
						<ThCell width="140px">대기 번호</ThCell>
						<ThCell width="110px">이름</ThCell>
						<ThCell width="125px">인원</ThCell>
						<ThCell width="250px">전화번호</ThCell>
						<ThCell width="300px">
							{waitingDataStatus === 'waiting' ? (
								<span>현재 대기 {todayWaitingNum}팀</span>
							) : (
								<span>전체 대기 팀 {todayWaitingNum}팀</span>
							)}
						</ThCell>
					</TableHeader>
				</thead>
				<WaitingItemList>
					<MemoizedWaitingItem waitingInfo={waitingInfo} waitingDataStatus={waitingDataStatus} />
					{!isWaitingAvailable ? (
						<MemoizedTableMesesage>
							<td>
								대기가 마감되었습니다. <p>대기를 받으시려면 대기 가능 버튼을 클릭해주세요.</p>
							</td>
						</MemoizedTableMesesage>
					) : (
						<MemoizedTableMesesage>
							<td>
								대기를 받고 있습니다. <p>대기 마감을 원하시면 대기 마감 버튼을 클릭해주세요.</p>
							</td>
						</MemoizedTableMesesage>
					)}
				</WaitingItemList>
			</table>
		</TableBox>
	);
};

export default WaitingTableBox;

const TableBox = styled.div`
	width: 1046px;
	height: 625px;
	margin-bottom: 48px;
	padding-top: 20px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.background : theme.darkColor?.background)};
	border: ${({ theme }) => (theme.lightColor ? 'none' : `1px solid ${theme.textColor.white}`)};
	overflow-y: scroll;
	overflow-x: hidden;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

// eslint-disable-next-line prettier/prettier
const ThCell = styled.th<ThProps>`
	width: ${({ width }) => width};
`;

const TableHeader = styled.tr`
	width: 982px;
	height: 68px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	border-radius: 15px;
	display: flex;
	align-items: center;
	margin: 0 32px 15px 32px;
	padding-left: 32px;
	padding-right: 40px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.main : theme.textColor.white)};
	border: ${({ theme }) => (theme.lightColor ? 'none' : '1px solid white')};
	color: ${({ theme }) =>
		theme.lightColor
			? theme.color === 'blue' || theme.color === 'purple'
				? theme.textColor.white
				: theme.textColor.black
			: theme.textColor.black};
`;

const WaitingItemList = styled.tbody`
	width: 982px;
	height: 470px;
	margin: 0 0 32px 32px;
`;

const TableMesesage = styled.tr`
	width: 982px;
	height: 72px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	td {
		padding-left: 40px;
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		line-height: 35px;
	}
`;
