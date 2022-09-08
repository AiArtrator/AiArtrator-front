/* eslint-disable */
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signup, emailDupl, nicknameDupl, phoneDupl } from '../../axios/User';
import { setAccsstoken, setUser } from '../../reducers/user';

import './signup-form.scss';
import Logo from '../../assets/logo/MainLogoV1.png';

const Index = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state) => state.user);
	const [info, setInfo] = useState({
		email: '',
		password: '',
		passwordCheck: '',
		nickname: '',
		phone: '',
		organization: '',
	});

	const [errorInfo, setErrorInfo] = useState({
		email: '\u00a0',
		password: '\u00a0',
		passwordCheck: '\u00a0',
		nickname: '\u00a0',
		phone: '\u00a0',
		organization: ' ',
	});

	const checkForm = () => {
		var ret = false;
		if (info.password === '') {
			setErrorInfo({
				...errorInfo,
				password: t('signup_alert10'),
			});
			if (info.password === '') {
				setErrorInfo({
					...errorInfo,
					password: t('signup_alert10'),
				});
			}
		} else if (info.passwordCheck === '') {
			setErrorInfo({
				...errorInfo,
				passwordCheck: t('signup_alert14'),
			});
		} else if (info.password !== info.passwordCheck) {
			setErrorInfo({
				...errorInfo,
				passwordCheck: t('signup_alert1'),
			});
		} else {
			setErrorInfo({ ...errorInfo, passwordCheck: '\u00a0' });
			ret = true;
		}
		return ret;
	};
	const emailDuplCheck = async () => {
		await emailDupl(info)
			.then((res) => {
				setErrorInfo({ ...errorInfo, email: '\u00a0' });
			})
			.catch((err) => {
				setErrorInfo({
					...errorInfo,
					email: t('signup_alert2'),
				});
				console.error(err);
			});
	};

	const handleEmail = () => {
		if (info.email === '') {
			setErrorInfo({
				...errorInfo,
				email: t('signup_alert11'),
			});
		} else {
			emailDuplCheck();
		}
	};

	const phoneDuplCheck = async () => {
		await phoneDupl(info)
			.then((res) => {
				setErrorInfo({ ...errorInfo, phone: '\u00a0' });
			})
			.catch((err) => {
				console.error(err);
				setErrorInfo({
					...errorInfo,
					phone: t('signup_alert5'),
				});
			});
	};

	const handlePhone = () => {
		if (info.phone === '') {
			setErrorInfo({
				...errorInfo,
				phone: t('signup_alert13'),
			});
		} else {
			phoneDuplCheck();
		}
	};

	const nicknameDuplCheck = async () => {
		await nicknameDupl(info)
			.then((res) => {
				setErrorInfo({ ...errorInfo, nickname: '\u00a0' });
			})
			.catch((err) => {
				console.error(err);
				setErrorInfo({
					...errorInfo,
					nickname: t('signup_alert3'),
				});
			});
	};

	const handleNickName = () => {
		if (info.nickname === '') {
			setErrorInfo({
				...errorInfo,
				nickname: t('signup_alert12'),
			});
		} else {
			nicknameDuplCheck();
		}
	};

	const handleError = (status) => {
		if (status === 412) {
			setErrorInfo({
				...errorInfo,
				password: t('signup_alert4'),
				passwordCheck: t('signup_alert4'),
			});
		} else if (status === 409) {
			setErrorInfo({
				...errorInfo,
				phone: t('signup_alert5'),
			});
		} else if (status === 400) {
			alert(t('signup_alert6'));
		} else if (status === 500) {
			alert(t('signup_alert7'));
		}
	};

	const signupSubmit = async () => {
		await signup(info)
			.then((res) => {
				// console.log(`[+] signup - res data: ${JSON.stringify(res.data.data)}`);
				dispatch(setUser(res.data.data.user));
				dispatch(setAccsstoken(res.data.data.accesstoken));
				// console.log(`[+] signup - userState: ${JSON.stringify(userState)}`);
				navigate('/');
				alert(t('signup_alert8'));
			})
			.catch((err) => {
				handleError(err.response.data.status);
			});
	};

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'email') {
			setInfo({ ...info, email: value });
			if (value === '') {
				setErrorInfo({ ...errorInfo, email: t('signup_alert11') });
			} else {
				setErrorInfo({ ...errorInfo, email: '\u00a0' });
			}
		} else if (className === 'password') {
			setInfo({ ...info, password: value });
			if (value === '') {
				setErrorInfo({ ...errorInfo, password: t('signup_alert10') });
			} else {
				setErrorInfo({ ...errorInfo, password: '\u00a0' });
			}
		} else if (className === 'passwordCheck') {
			setInfo({ ...info, passwordCheck: value });
			if (value === '') {
				setErrorInfo({ ...errorInfo, passwordCheck: t('signup_alert14') });
			} else {
				setErrorInfo({ ...errorInfo, passwordCheck: '\u00a0' });
			}
		} else if (className === 'nickname') {
			setInfo({ ...info, nickname: value });
			if (value === '') {
				setErrorInfo({ ...errorInfo, nickname: t('signup_alert12') });
			} else {
				setErrorInfo({ ...errorInfo, nickname: '\u00a0' });
			}
		} else if (className === 'phone') {
			setInfo({ ...info, phone: value });
			if (value === '') {
				setErrorInfo({ ...errorInfo, phone: t('signup_alert13') });
			} else {
				setErrorInfo({ ...errorInfo, phone: '\u00a0' });
			}
		} else if (className === 'organization') {
			setInfo({ ...info, organization: value });
		} else {
			console.error('[-] error from SignupForm');
		}
	};

	const isPrepared = () => {
		if (
			info.email === '' ||
			info.nickname === '' ||
			info.password === '' ||
			info.passwordCheck === '' ||
			info.phone === ''
		) {
			if (info.email === '') {
				setErrorInfo({ ...errorInfo, email: t('signup_alert11') });
			} else if (info.password === '') {
				setErrorInfo({ ...errorInfo, password: t('signup_alert10') });
			} else if (info.passwordCheck === '') {
				setErrorInfo({ ...errorInfo, passwordCheck: t('signup_alert14') });
			} else if (info.nickname === '') {
				setErrorInfo({ ...errorInfo, nickname: t('signup_alert12') });
			} else if (info.phone === '') {
				setErrorInfo({ ...errorInfo, phone: t('signup_alert13') });
			}
		} else if (checkForm()) {
			signupSubmit();
		}
	};

	return (
		<div className="signup-form">
			<div className="form">
				<div className="image">
					<img className="image" src={Logo} alt="logo" />
				</div>
				<div>
					<label>{t('email')}</label>
					<span style={{ color: 'red' }}> *</span>
					<br />

					<input
						className="email"
						type="email"
						placeholder={t('signup_alert12')}
						value={info.email}
						onChange={handleChange}
					/>

					<div className="line"></div>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.email}
					</div>
				</div>
				<div>
					<span>{t('password')}</span>
					<span style={{ color: 'red' }}> *</span>
					<br />
					<input
						className="password"
						type="password"
						placeholder={t('signup_alert10')}
						value={info.password}
						onChange={handleChange}
						onClick={handleEmail}
					/>
					<div className="line"></div>
					<div className="errorMessage" id="checkMess">
						{errorInfo.password}
					</div>
				</div>
				<div>
					<span>{t('password_conf')}</span>
					<span style={{ color: 'red' }}> *</span>
					<br />
					<input
						className="passwordCheck"
						type="password"
						placeholder={t('signup_alert14')}
						value={info.passwordCheck}
						onChange={handleChange}
					/>
					<div className="line"></div>
					<div className="errorMessage" id="checkMess">
						{errorInfo.passwordCheck}
					</div>
				</div>
				<div>
					<span>{t('nickname')}</span>
					<span style={{ color: 'red' }}> *</span>
					<br />
					<input
						className="nickname"
						type="nickname"
						placeholder={t('signup_alert12')}
						value={info.nickname}
						onChange={handleChange}
						onClick={checkForm}
					/>

					<div className="line"></div>
					<div className="errorMessage" id="checkMess">
						{errorInfo.nickname}
					</div>
				</div>
				<div>
					<span>{t('phone')}</span>
					<span style={{ color: 'red' }}> *</span>
					<br />
					<input
						className="phone"
						type="phonenumber"
						placeholder={t('signup_alert13')}
						value={info.phone}
						onChange={handleChange}
						onClick={handleNickName}
					/>
					<div className="line"></div>
					<div className="errorMessage" id="checkMess">
						{errorInfo.phone}
					</div>
				</div>
				<div>
					<label>{t('organization')}</label>
					<input
						className="organization"
						type="text"
						placeholder={t('org_place')}
						value={info.organization}
						onChange={handleChange}
						onClick={handlePhone}
					/>
					<div className="line"></div>
				</div>
				<button className="submit-button" onClick={isPrepared}>
					{t('try_signup')}
				</button>
			</div>
		</div>
	);
};

export default Index;
