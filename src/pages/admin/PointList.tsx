import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import withAuth from '../../components/adminMode/WithAuth';
import ManagementHeader from '../../components/adminMode/ManagementHeader';

type Points = {
	id?: string;
	date: number;
	phoneNumber: string;
	point: number;
};

function underBarPhoneNumber(phoneNumber: string): string {
	const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // 숫자만 남기기
	const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/); // 정규표현식 사용하여 매칭
	if (match) {
		return [match[1], match[2], match[3]].join('-');
	}
	return phoneNumber;
}

function PointList() {
	const [points, setPoints] = useState<Points[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	useEffect(() => {
		const fetchPoints = async () => {
			const pointsCollection = collection(db, 'point');
			const pointsSnapshot = await getDocs(pointsCollection);
			const pointsData: Points[] = [];
			pointsSnapshot.forEach((doc) => {
				const data = doc.data();
				if (data) {
					const point: Points = {
						id: doc.id,
						date: data.date,
						phoneNumber: data.phoneNumber,
						point: data.point,
					};
					pointsData.push(point);
				}
			});
			pointsData.sort((a, b) => a.date - b.date);
			setPoints(pointsData);
		};

		fetchPoints();
	}, []);
	// 전체 페이지 수
	const totalPages = Math.ceil(points.length / itemsPerPage);

	// 현재 페이지의 항목 선택
	const currentItems = points.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const MemoizedTotalMember = React.memo(TotalMember);

	return (
		<Layout>
			<ManagementHeader headerText="포인트 내역 조회" />
			<Container>
				<MemoizedTotalMember>
					<p className="totalMemberText">전체 회원수</p>
					<p>{points.length}명</p>
				</MemoizedTotalMember>
				<Table>
					<THead>
						<tr>
							<th>전화 번호</th>
							<th>포인트</th>
						</tr>
					</THead>
					<tbody>
						<tr>
							{currentItems.map((point) => (
								<Item key={point.id}>
									<p className="phoneNum">{underBarPhoneNumber(point.phoneNumber)}</p>
									<p className="point">{point.point.toLocaleString()}</p>
								</Item>
							))}
						</tr>
						<tr>
							<Pagination>
								<button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>이전</button>
								{Array.from({ length: totalPages }).map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentPage(index + 1)}
										className={currentPage === index + 1 ? 'currentPage' : ''}
									>
										{index + 1}
									</button>
								))}
								<button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>다음</button>
							</Pagination>
						</tr>
					</tbody>
				</Table>
			</Container>
		</Layout>
	);
}
const Layout = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor.background)};
	user-select: none;
`;

const Container = styled.div`
	margin-top: 30px;
	margin-left: 100px;
	margin-right: 100px;
`;
const TotalMember = styled.div`
	width: 270px;
	line-height: 50px;
	padding-left: 20px;
	padding-right: 20px;
	height: 50px;
	display: flex;
	justify-content: space-between;
	font-size: ${({ theme }) => theme.fontSize.xl};
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.main : theme.darkColor.main)};
	border-radius: 10px;

	p {
		&.totalMemberText {
			font-weight: ${({ theme }) => theme.fontWeight.semibold};
		}
	}
`;
const Table = styled.table`
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.background : 'none')};
	height: 610px;
	border-radius: 10px;
	margin-top: 25px;
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	padding-bottom: 30px;
`;
const THead = styled.thead`
	width: 100%;
	display: flex;
	margin-top: 15px;
	justify-content: center;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};

	th {
		padding: 20px 180px;
	}
`;

const Item = styled.td`
	width: 900px;
	display: flex;
	justify-content: space-around;
	border-radius: 10px;
	padding: 20px;
	margin-bottom: 20px;
	background-color: ${({ theme }) => theme.textColor.white};
	color: ${({ theme }) => theme.textColor.black};
	font-size: ${({ theme }) => theme.fontSize['xl']};

	p {
		text-align: center;

		&.phoneNum {
			width: 470px;
		}

		&.point {
			width: 430px;
		}
	}
`;
const Pagination = styled.td`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 10px;
	left: 400px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};

	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};

	button {
		margin: 0 5px;
		padding: 5px 10px;
		cursor: pointer;

		&.currentPage {
			color: ${({ theme }) => (theme.lightColor ? theme.lightColor.point : theme.darkColor.point)};
			font-weight: ${({ theme }) => theme.fontWeight.semibold};
		}
	}
`;

export default withAuth(PointList);
