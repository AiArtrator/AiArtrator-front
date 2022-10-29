import React from 'react';
import './top-button.scss';

const Index = () => {
	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	return (
		<div className="top-button" onClick={scrollTop}>
			⬆
		</div>
	);
};
export default Index;
