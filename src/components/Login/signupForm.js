/* eslint-disable react/prop-types */
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
		if (info.password !== info.passwordCheck) {
			setErrorInfo({
				...errorInfo,
				passwordCheck: '비밀번호가 일치하지 않습니다.',
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
				console.log(res);
				setErrorInfo({ ...errorInfo, email: '\u00a0' });
			})
			.catch((err) => {
				setErrorInfo({
					...errorInfo,
					email: 'The Email is already registered.',
				});
				console.error(err);
			});
	};

	const phoneDuplCheck = async () => {
		await phoneDupl(info)
			.then((res) => {
				console.log(res);
				setErrorInfo({ ...errorInfo, phone: '\u00a0' });
			})
			.catch((err) => {
				console.error(err);
				setErrorInfo({
					...errorInfo,
					phone: err.response.data.message,
				});
			});
	};

	const nicknameDuplCheck = async () => {
		await nicknameDupl(info)
			.then((res) => {
				console.log(res);
				setErrorInfo({ ...errorInfo, nickname: '\u00a0' });
			})
			.catch((err) => {
				console.error(err);
				setErrorInfo({
					...errorInfo,
					nickname: 'The Nickname is already registered.',
				});
			});
	};

	const signupSubmit = async () => {
		await signup(info)
			.then((res) => {
				console.log(`[+] signup - res data: ${JSON.stringify(res.data.data)}`);
				dispatch(setUser(res.data.data.user));
				dispatch(setAccsstoken(res.data.data.accesstoken));
				console.log(`[+] signup - userState: ${JSON.stringify(userState)}`);
				navigate('/');
				alert('회원가입을 축하합니다.');
			})
			.catch((err) => {
				console.error(err);
				alert('ERROR', err.response.data.message);
			});
	};

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'email') {
			setInfo({ ...info, email: value });
			setErrorInfo({ ...errorInfo, email: '중복 확인이 필요합니다.' });
		} else if (className === 'password') {
			setInfo({ ...info, password: value });
		} else if (className === 'passwordCheck') {
			setInfo({ ...info, passwordCheck: value });
			if (info.password === '') {
				setErrorInfo({ ...errorInfo, password: '비밀번호를 입력하세요.' });
			}
		} else if (className === 'nickname') {
			setInfo({ ...info, nickname: value });
			setErrorInfo({ ...errorInfo, nickname: '중복 확인이 필요합니다.' });
		} else if (className === 'phone') {
			setInfo({ ...info, phone: value });
			setErrorInfo({ ...errorInfo, phone: '중복 확인이 필요합니다.' });
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
				setErrorInfo({ ...errorInfo, email: '이메일을 입력하세요.' });
			} else if (info.password === '') {
				setErrorInfo({ ...errorInfo, password: '비밀번호를 입력하세요' });
			} else if (info.passwordCheck === '') {
				setErrorInfo({ ...errorInfo, passwordCheck: '비밀번호를 입력하세요' });
			} else if (info.nickname === '') {
				setErrorInfo({ ...errorInfo, nickname: '닉네임을 입력하세요' });
			} else if (info.phone === '') {
				setErrorInfo({ ...errorInfo, phone: '전화번호를 입력하세요' });
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
						placeholder="이메일을 입력해주세요. "
						value={info.email}
						onChange={handleChange}
					/>

					<div className="line"></div>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.email}
					</div>
				</div>
				<div>
					<span>비밀번호</span>
					<span style={{ color: 'red' }}> *</span>
					<br />
					<input
						className="password"
						type="password"
						placeholder="비밀먼호를 입력해주세요. "
						value={info.password}
						onChange={handleChange}
						onClick={emailDuplCheck}
					/>
					<div className="line"></div>
					<div className="errorMessage" id="checkMess">
						{errorInfo.password}
					</div>
				</div>
				<div>
					<span>비밀번호 확인</span>
					<span style={{ color: 'red' }}> *</span>
					<br />
					<input
						className="passwordCheck"
						type="password"
						placeholder="비밀먼호를 입력해주세요. "
						value={info.passwordCheck}
						onChange={handleChange}
					/>
					<div className="line"></div>
					<div className="errorMessage" id="checkMess">
						{errorInfo.passwordCheck}
					</div>
				</div>
				<div>
					<span>닉네임</span>
					<span style={{ color: 'red' }}> *</span>
					<br />
					<input
						className="nickname"
						type="nickname"
						placeholder="닉네임을 입력해주세요. "
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
					<span>전화번호</span>
					<span style={{ color: 'red' }}> *</span>
					<br />
					<input
						className="phone"
						type="phonenumber"
						placeholder="휴대폰 번호를 입력해주세요. "
						value={info.phone}
						onChange={handleChange}
						onClick={nicknameDuplCheck}
					/>
					<div className="line"></div>
					<div className="errorMessage" id="checkMess">
						{errorInfo.phone}
					</div>
				</div>
				<div>
					<label>소속기관 (선택)</label>
					<input
						className="organization"
						type="text"
						placeholder="소속 기관을 입력해주세요. "
						value={info.organization}
						onChange={handleChange}
						onClick={phoneDuplCheck}
					/>
					<div className="line"></div>
				</div>
				<button className="submit-button" onClick={isPrepared}>
					회원가입
				</button>
			</div>
		</div>
	);
};

export default Index;
