/*eslint-disable*/
import React from 'react';
import './my-balance-container.scss';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import MyBalanceBox from '../components/MyBalance/MyBalBox/index';
import MyHistoryItem from '../components/MyBalance/HistoryCard/Index.js';
import Loading from '../components/Loading/Loading';
import TopBtn from '../components/TopBtn/index';

import MainLogo from '../assets/logo/logo_c1.png';

const MyBalanceContainer = ({ myBalance, myHistory }) => {
	const usernickname = useSelector((state) => state.user?.user?.usernickname);

	if (!myHistory) return <Loading />;

	return (
		<>
			<div className="my-bal-form">
				<img className="my-bal-logo" src={MainLogo} />
				<MyBalanceBox myBalance={myBalance} />

				<div className="my-history">
					<div className="hist-title">토큰 내역 조회</div>
					<div>
						<MyHistoryItem key={history.id} myHistory={history} />
					</div>
					{myHistory ? (
						<div>
							{myHistory.map((history) => {
								return <MyHistoryItem key={history.id} myHistory={history} />;
							})}
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
			<TopBtn />
		</>
	);
};

MyBalanceContainer.propTypes = {
	myBalance: PropTypes.number,
	myHistory: PropTypes.array,
};
export default MyBalanceContainer;
