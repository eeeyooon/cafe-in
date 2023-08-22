import React, { useRef } from 'react';
import styled from 'styled-components';
import ManagementHeader from '../adminMode/ManagementHeader';
import HeaderButton from '../adminMode/HeaderButton';

interface HeaderPropType {
	setIsProgress: () => void;
	setIsComplete: () => void;
}
function Header({ setIsProgress, setIsComplete }: HeaderPropType) {
	const progressRef = useRef<HTMLButtonElement>(null);
	const completeRef = useRef<HTMLButtonElement>(null);

	const handleClickProgress = () => {
		completeRef.current?.classList.remove('is-selected');
		progressRef.current?.classList.add('is-selected');
		setIsProgress();
	};

	const handleClickComplete = () => {
		progressRef.current?.classList.remove('is-selected');
		completeRef.current?.classList.add('is-selected');
		setIsComplete();
	};
	return (
		<>
			<HeadWrapper>
				<ManagementHeader headerText="주문 관리">
					<ButtonContainer>
						<HeaderButton text="진행중" decorate="is-selected" ref={progressRef} onClick={handleClickProgress} />
						<HeaderButton text="완료주문" ref={completeRef} onClick={handleClickComplete} />
					</ButtonContainer>
				</ManagementHeader>
			</HeadWrapper>
		</>
	);
}

export default Header;

const HeadWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const ButtonContainer = styled.div`
	display: flex;
`;
