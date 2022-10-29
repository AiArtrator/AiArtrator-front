import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './upload-button.scss';

const Index = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	return (
		<>
			<button
				onClick={() => {
					navigate('/NetworkUpload');
				}}
			>
				{t('uploadbtn')}
			</button>
		</>
	);
};

export default Index;
