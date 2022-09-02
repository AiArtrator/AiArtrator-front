import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { myPaymentHist } from '../../axios/User';

import Loading from 'react-loading';
import MyBalanceContainer from '../../container/MyBalanceContainer';

const Index = () => {
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const [nowBalance, setNowBalance] = useState(0);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [myTokenHistory, setMyTokenHistory] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			setNowBalance(0);
			setMyTokenHistory({});
			try {
				const response = await myPaymentHist(accesstoken);
				setNowBalance(response.data.data.currentToken.currentToken);
				setMyTokenHistory(response.data.data.paymentList);
			} catch (err) {
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) return <Loading />;

	if (error) return <Loading />;

	if (!myTokenHistory) return <Loading />;

	return (
		<>
			<MyBalanceContainer myBalance={nowBalance} myHistory={myTokenHistory} />
		</>
	);
};

export default Index;
