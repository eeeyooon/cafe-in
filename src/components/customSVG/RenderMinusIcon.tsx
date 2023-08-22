import { MinusSVG } from './WaitingSVG';
import { DefaultTheme } from 'styled-components/dist/types';

interface RenderMinusIconProps {
	decreaseDisable: boolean;
	theme: DefaultTheme;
}

function RenderMinusIcon({ decreaseDisable, theme }: RenderMinusIconProps) {
	const renderIcon = () => {
		if (decreaseDisable) {
			return (
				<img
					alt="1 빼기 버튼"
					aria-label="1 빼기"
					width={75}
					height={91}
					src={process.env.PUBLIC_URL + '/assets/user/minusIcon_disable.svg'}
				/>
			);
		} else if (theme.lightColor) {
			return <MinusSVG />;
		} else {
			return (
				<img
					alt="1 빼기 버튼"
					aria-label="1 빼기"
					src={process.env.PUBLIC_URL + '/assets/user/minusIcon_dark.svg'}
					width={75}
					height={91}
				/>
			);
		}
	};

	return <div>{renderIcon()}</div>;
}

export default RenderMinusIcon;
