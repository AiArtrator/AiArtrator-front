import React from 'react';

import Loading from '../components/Loading/Loading';

const MyBalanceContainer = ({ myBalData, myHistory }) => {
	if (!myBalData) {
		return <Loading />;
	}
	if (!myHistory) {
		return <Loading />;
	}
	return <></>;
};

export default MyBalanceContainer;
