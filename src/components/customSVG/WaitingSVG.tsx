import styled from 'styled-components';

function MinusSVG() {
	return (
		<Minus width="75" height="91" viewBox="0 0 75 91" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="37.5" cy="53.5" r="37.5" fill="#FFC26F" />
			<path d="M51.1001 49.5341V58H24.907V49.5341H51.1001Z" fill="white" />
		</Minus>
	);
}

function PlusSVG() {
	return (
		<Plus width="75" height="92" viewBox="0 0 75 92" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="37.5" cy="54.5" r="37.5" fill="#FFC26F" />
			<path
				d="M33.5291 74.5625V35.2443H42.4496V74.5625H33.5291ZM18.3303 59.3636V50.4432H57.6484V59.3636H18.3303Z"
				fill="white"
			/>
		</Plus>
	);
}

const Minus = styled.svg`
	circle {
		fill: ${({ theme }) => (theme.lightColor ? theme.lightColor.main : '#ffc26f')};
	}
`;

const Plus = styled.svg`
	circle {
		fill: ${({ theme }) => (theme.lightColor ? theme.lightColor.main : '#ffc26f')};
	}
`;

export { MinusSVG, PlusSVG };
