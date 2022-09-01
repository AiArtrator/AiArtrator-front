/* eslint-disable*/
import React, { useState } from 'react';
import './sidebar.scss';
import { useNavigate } from 'react-router-dom';

const Index = () => {
	const navigate = useNavigate();

	// const [pageCol, setPageCol] = useState(['#00080', 'white', 'white']);

	const go = (e) => {
		const className = e.target.className;
		if (className === 'my-networks') {
			navigate('/MyNetworks');
			// setPageCol(['#00080', 'white', 'white']);
		} else if (className === 'subscribe-networks') {
			navigate('/MySubscribe');
			// setPageCol(['white', '#00080', 'white']);
		} else if (className === 'purchased-network') {
			navigate('/PurchasedNetwork');
			// setPageCol(['white', 'white', '#00080']);
		}
	};

	return (
		<div className="side-nav">
			<nav>
				<ul>
					<li
						className="my-networks"
						// style={{ backgroundColor: pageCol[0] }}
						onClick={go}
					>
						<span>업로드 모델</span>
					</li>
					<li className="subscribe-networks" onClick={go}>
						{/* style={{ backgroundColor: pageCol[1] }} */}
						<span>구독 모델</span>
					</li>
					<li className="purchased-network" onClick={go}>
						{/* style={{ backgroundColor: pageCol[2] }} */}
						<span>구매한 모델</span>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Index;
