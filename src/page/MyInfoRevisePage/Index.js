import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
	getMypage,
	phoneDupl,
	nicknameDupl,
	putReviseInfo,
} from '../../axios/User';
import Loading from '../../components/Loading/Loading';

import './my-info-revise-page.scss';
import Logo from '../../assets/logo/LogoBox1.png';

const Index = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const userId = useSelector((state) => state.user.user.id);
	const accesstoken = useSelector((state) => state.user.accesstoken);

	const [info, setInfo] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [reviseInfo, setReviseInfo] = useState({
		nickname: '',
		phone: '',
		organization: '',
	});
	const [errorInfo, setErrorInfo] = useState({
		nickname: '\u00a0',
		phone: '\u00a0',
		organization: '\u00a0',
	});
	var tosubmit = { nickname: '', phone: '', organization: '' };

	const nicknameDuplCheck = async () => {
		await nicknameDupl(reviseInfo)
			.then((res) => {
				setErrorInfo({ ...errorInfo, nickname: '\u00a0' });
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				setErrorInfo({ ...errorInfo, nickname: t('signup_alert3') });
			});
	};
	const nicknameDuplbutton = () => {
		if (reviseInfo.nickname === '') {
			setErrorInfo({ ...errorInfo, nickname: t('blank') });
		} else if (reviseInfo.nickname === info.nickname) {
			setErrorInfo({ ...errorInfo, nickname: '\u00a0' });
		} else {
			nicknameDuplCheck();
		}
	};

	const phoneDuplCheck = async () => {
		await phoneDupl(reviseInfo)
			.then((res) => {
				setErrorInfo({ ...errorInfo, phone: '\u00a0' });
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				setErrorInfo({ phone: t('signup_alert5') });
			});
	};

	const phoneDuplbutton = () => {
		if (reviseInfo.phone === '') {
			setErrorInfo({ ...errorInfo, phone: t('signup_alert10') });
		} else if (reviseInfo.phone === info.phone) {
			setErrorInfo({ ...errorInfo, phone: '\u00a0' });
		} else {
			phoneDuplCheck();
		}
	};

	const reviseSubmit = async () => {
		await putReviseInfo(accesstoken, tosubmit)
			.then((res) => {
				console.log(
					`[+] revise myinfo - res data: ${JSON.stringify(res.data)}`
				);
				alert(t('revise_succ'));
				navigate('/MyInfo');
			})
			.catch((err) => {
				console.error(err);
				alert(t('revise_fail'));
			});
	};

	const isRevised = () => {
		tosubmit = reviseInfo;
		if (tosubmit.nickname === '') {
			tosubmit.nickname = info.nickname;
		} else if (tosubmit.phone === '') {
			tosubmit.phone = info.phone;
		}
		if (
			tosubmit.nickname === info.nickname &&
			tosubmit.phone === info.phone &&
			tosubmit.organization === info.organization
		) {
			alert(t('no_change'));
			navigate('/MyInfo');
		} else if (
			reviseInfo.nickname === '' &&
			reviseInfo.phone === '' &&
			reviseInfo.organization === ''
		) {
			alert(t('no_change'));
			navigate('/MyInfo');
		} else {
			reviseSubmit();
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setLoading(true);
			setInfo(null);
			setReviseInfo(null);
			try {
				const response = await getMypage(userId);
				setInfo(response.data.data);
				setReviseInfo(response.data.data);
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

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'nickname') {
			setReviseInfo({ ...reviseInfo, nickname: value });
		} else if (className === 'phone') {
			setReviseInfo({ ...reviseInfo, phone: value });
		} else if (className === 'organization') {
			setReviseInfo({ ...reviseInfo, organization: value });
		} else {
			console.error('[-] error from Revise');
		}
	};
	return (
		<div className="myrevise-form">
			<div className="reviseform">
				<div className="inrow">
					<img src={Logo} alt="logo" />
				</div>
				<label>{t('revise_page')} </label>
				<span>{t('nickname')}</span>
				<span style={{ color: 'red' }}> *</span>
				<div className="info">{info.nickname}</div>
				<div className="revise-part">
					<input
						className="nickname"
						type="nickname"
						placeholder={t('dupl_plach')}
						value={reviseInfo.nickname}
						onChange={handleChange}
					/>
					<button className="dupl-button" onClick={nicknameDuplbutton}>
						{t('dupl_btn')}
					</button>
				</div>
				<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
					{errorInfo.nickname}
				</div>
				<span>{t('phone')}</span>
				<span style={{ color: 'red' }}> *</span>
				<div className="info">{info.phone}</div>
				<div className="revise-part">
					<input
						className="phone"
						type="phone"
						placeholder={t('dupl_plach')}
						value={reviseInfo.phone}
						onChange={handleChange}
					/>
					<button className="dupl-button" onClick={phoneDuplbutton}>
						{t('dupl_btn')}
					</button>
				</div>
				<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
					{errorInfo.phone}
				</div>

				<span>{t('organization')}</span>
				<div className="info">
					{info.organization ? (
						<div>{info.organization}</div>
					) : (
						<div>{t('blank')}</div>
					)}
				</div>
				<div className="revise-part">
					<input
						className="organization"
						type="organization"
						placeholder={t('dupl_plach')}
						value={reviseInfo.organization}
						onChange={handleChange}
					/>
				</div>
				<button className="submit-button" onClick={isRevised}>
					{t('revise_btn')}
				</button>
			</div>
		</div>
	);
};

export default Index;
