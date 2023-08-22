import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface propsType {
	children: ReactNode;
}
function ModalPortal({ children }: propsType) {
	const el = document.getElementById('modal') as HTMLDivElement;
	return ReactDOM.createPortal(children, el);
}

export default ModalPortal;
