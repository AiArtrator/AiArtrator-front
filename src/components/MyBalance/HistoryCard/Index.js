/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import './historycard.scss';

const Index = ({ myHistory }) => {
	const { t } = useTranslation();

	const defaultData = {
		content: 'No data. ',
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
				<div className="rest-title">{t('left_token')}</div>
				{myHistory.balance}
			</div>
		</div>
	);
};

Index.propTypes = {
	myHistory: PropTypes.object,
};
export default Index;
