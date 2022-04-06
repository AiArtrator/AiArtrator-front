import React from 'react';
import './sidebar.scss';
import { useNavigate } from 'react-router-dom';

const Index = () => {
	const navigate = useNavigate();
	const go = (e) => {
		const className = e.target.className;
		if (className === 'my-networks') {
			navigate('/MyNetworks');
		} else if (className === 'subscribe-networks') {
			navigate('/MySubscribe');
		}
	};
	return (
		<div className="side-nav">
			<nav>
				<ul>
					<li className="my-networks" onClick={go}>
						<span>업로드 모델</span>
					</li>
					<li className="subscribe-networks" onClick={go}>
						<span>구독 모델</span>
					</li>
					<li className="use-networks">
						<span>이용 모델</span>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Index;
