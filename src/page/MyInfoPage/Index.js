import React, { useState, useEffect } from 'react';
import './my-info-page.scss';
import { getMypage } from '../../axios/User';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Loading from '../../components/Loading/Loading';

import Logo from '../../assets/logo/LogoBox1.png';

const Index = () => {
	const { t } = useTranslation();

	const userId = useSelector((state) => state.user.user.id);
	const [info, setInfo] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setLoading(true);
			setInfo(null);
			try {
				const response = await getMypage(userId);
				setInfo(response.data.data);
			} catch (err) {
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	}, []);
	if (loading) {
		return <Loading />;
	}
	if (error) {
		return <Loading />;
	}
	if (!info) {
		return <Loading />;
	}
	return (
		<div className="mypage-form">
			<div className="myform">
				<div className="inrow">
					<img src={Logo} />
				</div>
				<label>
					{info.nickname} {t('myinfo')}
				</label>
				<label>{t('email')}</label>
				<div className="info"> {info.email}</div>
				<label>{t('nickname')}</label>
				<div className="info">{info.nickname}</div>
				<label>{t('phone')}</label>
				<div className="info">{info.phone}</div>
				<label>{t('organization')}</label>
				<div className="info">
					{info.organization ? <>{info.organization}</> : <>{t('blank')}</>}
				</div>
				<Link to="/Revise">
					{' '}
					<button className="revise-button">{t('revise_btn')}</button>
				</Link>
			</div>
		</div>
	);
};

export default Index;
