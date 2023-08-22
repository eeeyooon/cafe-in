import { PlusSVG } from './WaitingSVG';
import { DefaultTheme } from 'styled-components/dist/types';

interface RenderPlusIconProps {
	theme: DefaultTheme;
}

function RenderPlusIcon({ theme }: RenderPlusIconProps) {
	const renderIcon = () => {
		if (theme.lightColor) {
			return <PlusSVG />;
		} else {
			return (
				<img
					alt="1 더하기 버튼"
					aria-label="1 더하기"
					width={75}
					height={91}
					src={process.env.PUBLIC_URL + '/assets/user/plusIcon_dark.svg'}
				/>
			);
		}
	};

	return <div>{renderIcon()}</div>;
}

export default RenderPlusIcon;
