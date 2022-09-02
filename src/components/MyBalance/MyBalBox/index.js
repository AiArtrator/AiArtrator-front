import React from 'react';
import './my-bal-part.scss';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MiniLogo from '../../../assets/logo/logo_c2.png';

const Index = ({ myBalance }) => {
	const usernickname = useSelector((state) => state.user.user.nickname);
	const navigate = useNavigate();

	const goFill = () => {
		navigate('/'); // 주소 수정필요
	};

	return (
		<>
			<div className="my-t-box">
				<div className="my-t-title"> {usernickname} 님의 현재 보유 토큰</div>

				<div className="in-row">
					<img className="my-t-logo" src={MiniLogo} />
					<span>{myBalance} Token</span>
					<button onClick={goFill}>충전하기</button>
				</div>
			</div>
			<div className="about-token">*** 1토큰은 10원입니다.</div>
		</>
	);
};

Index.propTypes = {
	myBalance: PropTypes.number,
};

export default Index;
