import React from 'react';

import Loading from '../components/Loading/Loading';

const MyBalanceContainer = ({ myData }) => {
	if (!myData) {
		return <Loading />;
	}
	return <></>;
};

export default MyBalanceContainer;
