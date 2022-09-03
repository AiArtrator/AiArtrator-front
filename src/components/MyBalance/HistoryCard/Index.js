/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './historycard.scss';

const Index = ({ myHistory }) => {
	const defaultData = {
		content: '결제내역이 없습니다. ',
		createdAt: '0000-00-00',
		price: '0 Token',
		balance: ' 0 Token',
	};

	return (
		<div className="hist-in-row">
			<div>
				<div>{myHistory.content}</div>

				<div className="created-at">{myHistory.createdAt}</div>
			</div>
			<div>
				<div>{myHistory.price}</div>

				<br />
				<div className="rest-title">잔여토큰</div>
				{myHistory.balance}
			</div>
		</div>
	);
};

Index.propTypes = {
	myHistory: PropTypes.array,
};
export default Index;
