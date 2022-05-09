import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { myPaymentHist } from '../../axios/User';
import MyHistoryItem from '../../components/HistoryCard/Index.js';

const Index = () => {
	const usernickname = useSelector((state) => state.user?.user?.nickname);
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
			setMyTokenHistory(null);
			try {
				const response = await myPaymentHist(accesstoken);
				setNowBalance(response.data.data.currentToken.currentToken);
				setMyTokenHistory(response.data.data.paymentList);
				console.log(response.data.data.paymentList);
				console.log(response.data);
			} catch (err) {
				console.error(err);
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return <div className="my-balance-form">로딩 중</div>;
	}
	if (error) {
		return <div className="my-balance-form">ERROR</div>;
	}
	if (!myTokenHistory) {
		console.log('아직 토큰 히스토리값이 설정되지 않음');
		return null;
	}

	console.log('내 토큰 내역 및 충전 페이지');
	return (
		<div className="my-balance-form">
			<br />
			<h1>나의 토큰 내역 페이지 입니다</h1>
			{usernickname} 님의 현재 보유 토큰
			{nowBalance} Token
			<div>충전하기</div>
			<div>*1토큰은 10원입니다.</div>
			<div className="my-history">
				<h4>토큰 내역 조회</h4>
				{myTokenHistory ? (
					<div>
						{myTokenHistory.map((history) => {
							return <MyHistoryItem key={history.id} history={history} />;
						})}
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Index;
