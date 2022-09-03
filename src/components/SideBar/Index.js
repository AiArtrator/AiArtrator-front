/* eslint-disable*/
import React, { useState } from 'react';
import './sidebar.scss';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Index = ({ pageCol }) => {
	const navigate = useNavigate();

	// const [pageCol, setPageCol] = useState(['#00080', 'white', 'white']);
	console.log(pageCol);

	const go = (e) => {
		const className = e.target.className;
		if (className === 'my-networks') {
			navigate('/MyNetworks');
		} else if (className === 'subscribe-networks') {
			navigate('/MySubscribe');
		} else if (className === 'purchased-network') {
			navigate('/PurchasedNetwork');
		}
	};

	return (
		<div className="side-nav">
			<nav>
				<ul>
					<li
						className="my-networks"
						style={{ backgroundColor: pageCol[0] }}
						onClick={go}
					>
						<span>업로드 모델</span>
					</li>
					<li
						className="subscribe-networks"
						onClick={go}
						style={{ backgroundColor: pageCol[1] }}
					>
						<span>구독 모델</span>
					</li>
					<li
						className="purchased-network"
						onClick={go}
						style={{ backgroundColor: pageCol[2] }}
					>
						<span>구매한 모델</span>
					</li>
				</ul>
			</nav>
		</div>
	);
};

Index.propTypes = {
	pageCol: PropTypes.array,
};

export default Index;
