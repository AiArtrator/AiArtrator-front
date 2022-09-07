import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Index = () => {
	const { t } = useTranslation();
	return (
		<>
			<Link to="/NetworkLists"> {t('modellist')} </Link>
		</>
	);
};

export default Index;
