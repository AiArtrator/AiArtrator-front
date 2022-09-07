import React from 'react';
import { Link } from 'react-router-dom';
import { userLogout } from '../../../reducers/user';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Index = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	return (
		<>
			<Link to="/" onClick={() => dispatch(userLogout)}>
				{t('logout')}
			</Link>
		</>
	);
};

export default Index;
