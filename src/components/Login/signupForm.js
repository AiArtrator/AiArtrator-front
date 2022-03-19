/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, emailDupl, nicknameDupl, phoneDupl } from '../../axios/User';
import { setAccsstoken, setUser } from '../../reducers/user';
import './signup-form.scss';

const Index = () => {
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
		email: '',
		password: '',
		passwordCheck: '',
		nickname: '',
		phone: '',
		organization: '',
	});

	const checkForm = () => {
		var ret = false;
		if (info.password !== info.passwordCheck) {
			setErrorInfo({
				...errorInfo,
				passwordCheck: '비밀번호가 일치하지 않습니다.',
			});
		} else {
			setErrorInfo({ ...errorInfo, passwordCheck: '' });
			ret = true;
		}
		return ret;
	};
	const emailDuplCheck = async () => {
		await emailDupl(info)
			.then((res) => {
				setErrorInfo({ ...errorInfo, email: res.data.message });
			})
			.catch((err) => {
				setErrorInfo({
					...errorInfo,
					email: '이미 사용하고 있는 이메일입니다.',
				});
				console.log('catch구문');
				console.error(err.data);
			});
	};

	const phoneDuplCheck = async () => {
		await phoneDupl(info)
			.then((res) => {
				setErrorInfo({ ...errorInfo, phone: res.data.message });
			})
			.catch((err) => {
				console.error(err.data);
				setErrorInfo({
					...errorInfo,
					phone: '이미 사용하고 있는 전화번호입니다.',
				});
			});
	};

	const nicknameDuplCheck = async () => {
		await nicknameDupl(info)
			.then((res) => {
				setErrorInfo({ ...errorInfo, nickname: res.data.message });
			})
			.catch((err) => {
				console.error(err);
				setErrorInfo({
					...errorInfo,
					nickname: '이미 사용하고 있는 닉네임입니다.',
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
				alert('회원가입 오류. 서버문제 or 이메일/닉네임/전화번호 중복');
			});
	};

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'email') {
			setInfo({ ...info, email: value });
		} else if (className === 'password') {
			setInfo({ ...info, password: value });
			if (info.email === '') {
				setErrorInfo({ ...errorInfo, email: '이메일을 입력하세요.' });
			} else {
				emailDuplCheck();
			}
		} else if (className === 'passwordCheck') {
			setInfo({ ...info, passwordCheck: value });
			if (info.password === '') {
				setErrorInfo({ ...errorInfo, password: '비밀번호를 입력하세요.' });
			}
		} else if (className === 'nickname') {
			setInfo({ ...info, nickname: value });
			if (info.passwordCheck === '') {
				setErrorInfo({
					...errorInfo,
					passwordCheck: '비밀번호를 입력하세요.',
				});
			} else if (info.password === '') {
				setErrorInfo({ ...errorInfo, password: '비밀번호를 입력하세요.' });
			} else {
				setErrorInfo({ ...errorInfo, password: '', passwordCheck: '' });
				checkForm();
			}
		} else if (className === 'phone') {
			setInfo({ ...info, phone: value });
			if (info.nickname === '') {
				setErrorInfo({ ...errorInfo, nickname: '닉네임을 입력하세요.' });
			} else {
				nicknameDuplCheck();
			}
		} else if (className === 'organization') {
			setInfo({ ...info, organization: value });
			if (info.phone === '') {
				setErrorInfo({ ...errorInfo, phone: '전화번호를 입력해주세요.' });
			} else {
				phoneDuplCheck();
			}
		} else {
			console.err('[-] error from SignupForm');
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
				emailDuplCheck();
				setErrorInfo({ ...errorInfo, password: '비밀번호를 입력하세요' });
			} else if (info.passwordCheck === '') {
				setErrorInfo({ ...errorInfo, passwordCheck: '비밀번호를 입력하세요' });
			} else if (info.nickname === '') {
				setErrorInfo({ ...errorInfo, nickname: '닉네임을 입력하세요' });
			} else if (info.phone === '') {
				nicknameDuplCheck();
				setErrorInfo({ ...errorInfo, phone: '전화번호를 입력하세요' });
			}
		} else if (checkForm()) {
			signupSubmit();
		}
	};

	return (
		<div className="signup-form">
			<div className="form">
				<h3>P O G</h3>
				<div>
					<span className="label">이메일</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="email"
						type="email"
						placeholder="이메일을 입력해주세요. "
						value={info.email}
						onChange={handleChange}
					/>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.email}
					</div>
				</div>
				<div>
					<span>비밀번호</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="password"
						type="password"
						placeholder="비밀먼호를 입력해주세요. "
						value={info.password}
						onChange={handleChange}
					/>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.password}
					</div>
				</div>
				<div>
					<span>비밀번호 확인</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="passwordCheck"
						type="password"
						placeholder="비밀먼호를 입력해주세요. "
						value={info.passwordCheck}
						onChange={handleChange}
					/>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.passwordCheck}
					</div>
				</div>
				<div>
					<span>닉네임</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="nickname"
						type="nickname"
						placeholder="닉네임을 입력해주세요. "
						value={info.nickname}
						onChange={handleChange}
					/>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.nickname}
					</div>
				</div>
				<div>
					<span>전화번호</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="phone"
						type="phonenumber"
						placeholder="휴대폰 번호를 입력해주세요. "
						value={info.phone}
						onChange={handleChange}
					/>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
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
					/>
				</div>
				<button className="submit-button" onClick={isPrepared}>
					회원가입
				</button>
			</div>
		</div>
	);
};

export default Index;
