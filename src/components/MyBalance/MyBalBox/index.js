import React from 'react';
import './my-bal-part.scss';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import MiniLogo from '../../../assets/logo/logo_c2.png';

const Index = ({ myBalance }) => {
	const usernickname = useSelector((state) => state.user.user.nickname);
	const navigate = useNavigate();
	const { t } = useTranslation();

	const goFill = () => {
		navigate('/'); // After business registration
		alert('If AI Artrator register business, it would be able to add Tokens.');
	};

	return (
		<>
			<div className="my-t-box">
				<div className="my-t-title">
					{usernickname} {t('now_bal')}
				</div>

				<div className="in-row">
					<img className="my-t-logo" src={MiniLogo} />
					<span>{myBalance} Token</span>
					<button onClick={goFill}>{t('fill_token')}</button>
				</div>
			</div>
			<div className="about-token">{t('model_notice1')}</div>
		</>
	);
};

Index.propTypes = {
	myBalance: PropTypes.number,
};

export default Index;
