import React from 'react';
import './my-bal-part.scss';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import MiniLogo from '../../../assets/logo/logo_c2.png';

const Index = ({ myBalance }) => {
	const usernickname = useSelector((state) => state.user.user.nickname);
	console.log(usernickname);
	return (
		<>
			<div className="my-t-box">
				<div> {usernickname} 님의 현재 보유 토큰</div>
				<img className="my-t-logo" src={MiniLogo} />
				{myBalance} Token
			</div>
		</>
	);
};

Index.propTypes = {
	myBalance: PropTypes.number,
};

export default Index;
