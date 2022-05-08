import React from 'react';
import PropTypes from 'prop-types';
import './historycard.scss';

const Index = ({ history }) => {
	const { content, createdAt, price, balance } = history;
	return (
		<div>
			{content}
			<br />
			{createdAt}
			<br />
			{price}
			<br />
			{balance}
		</div>
	);
};

Index.propTypes = {
	tokenHistory: PropTypes.object,
};
export default Index;
