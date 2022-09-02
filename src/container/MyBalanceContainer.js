/*eslint-disable*/
import React from 'react';
import './my-balance-container.scss';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import MyHistoryItem from '../components/HistoryCard/Index.js';
import MyBalanceBox from '../components/MyBalance/MyBalBox/index';

import MainLogo from '../assets/logo/logo_c1.png';

const MyBalanceContainer = ({ myBalance, myHistory }) => {
	const usernickname = useSelector((state) => state.user?.user?.usernickname);
	return (
		<>
			{' '}
			<div className="my-bal-form">
				<img className="my-bal-logo" src={MainLogo} />
				<MyBalanceBox myBalance={myBalance} />
				<br />
				<h1>나의 토큰 내역 페이지 입니다</h1>
				{usernickname} 님의 현재 보유 토큰
				{myBalance} Token
				<div>충전하기</div>
				<div>*1토큰은 10원입니다.</div>
				<div className="my-history">
					<h4>토큰 내역 조회</h4>
					{myHistory ? (
						<div>
							{myHistory.map((history) => {
								return <MyHistoryItem key={history.id} history={history} />;
							})}
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
};

MyBalanceContainer.propTypes = {
	myBalance: PropTypes.number,
	myHistory: PropTypes.array,
};
export default MyBalanceContainer;
