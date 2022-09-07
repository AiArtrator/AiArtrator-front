/* eslint-disable*/
import React, { useState } from 'react';
import './i18n-button.scss';
import i18n from '../../lang/i18n';
import { useTranslation } from 'react-i18next';

const Index = () => {
	const { t } = useTranslation();
	const [now, setNow] = useState('en');

	const clickHandler = () => {
		i18n.changeLanguage(now);
	};
	const changeLan = () => {
		if (now === 'ko') {
			setNow('en');
		} else if (now === 'en') {
			setNow('ko');
		}
		clickHandler();
	};

	return (
		<>
			<div className="i18n-button" onClick={changeLan}>
				{t('i18nbtn')}
			</div>
		</>
	);
};
export default Index;
