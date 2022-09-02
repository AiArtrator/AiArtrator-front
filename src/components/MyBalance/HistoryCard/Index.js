/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './historycard.scss';

const Index = ({ myHistory }) => {
	const [history, setHistory] = useState({
		content: '결제내역이 없습니다. ',
		createdAt: '0000-00-00',
		price: '0 Token',
		balance: ' 0 Token',
	});

	// if (myHistory) {
	// 	setHistory(myHistory);
	// }

	return (
		<div className="hist-in-row">
			<div>
				{history.content}
				<br />
				<div className="created-at">{history.createdAt}</div>
			</div>
			<div>
				{history.price}
				<br />
				<div className="rest-title">잔여토큰</div>
				{history.balance}
			</div>
		</div>
	);
};

Index.propTypes = {
	myHistory: PropTypes.array,
};
export default Index;
