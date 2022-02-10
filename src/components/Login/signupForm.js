/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
import { signup } from '../../axios/User';
import { setAccsstoken, setUser } from '../../reducers/user';
// import { MainLogo } from '../Logo';
// import { Input, SubmitButton } from '.';
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

	const checkForm = () => {
		if (info.password !== info.passwordCheck) return false;
		return true;
	};

	const signupSubmit = async () => {
		if (!checkForm()) {
			alert(`비밀번호가 일치하지 않습니다.`);
		}
		try {
			const res = await signup(info);
			console.log(`[+] signup - res data: ${JSON.stringify(res.data.data)}`);
			dispatch(setUser(res.data.data.user));
			dispatch(setAccsstoken(res.data.data.accesstoken));
			console.log(`[+] signup - userState: ${JSON.stringify(userState)}`);
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'email') {
			setInfo({ ...info, email: value });
		} else if (className === 'password') {
			setInfo({ ...info, password: value });
		} else if (className === 'passwordCheck') {
			setInfo({ ...info, passwordCheck: value });
		} else if (className === 'organization') {
			setInfo({ ...info, organization: value });
		} else if (className === 'nickname') {
			setInfo({ ...info, nickname: value });
		} else if (className === 'phone') {
			setInfo({ ...info, phone: value });
			// }else if (className === 'loginId') {
			// 	setInfo({ ...info, loginId: value });
		} else {
			console.err('[-] error from SignupForm');
		}
	};

	return (
		<div className="signup-form">
			<div className="form">
				<h3>P O G</h3>

				<div>
					<div className="inputTitle">이메일</div>
					<input
						className="email"
						type="email"
						placeholder="이메일을 입력해주세요. "
						value={info.email}
						onChange={handleChange}
					/>
				</div>
				<div>
					<div className="inputTitle">비밀번호</div>
					<input
						className="password"
						type="password"
						placeholder="비밀먼호를 입력해주세요. "
						value={info.password}
						onChange={handleChange}
					/>
				</div>
				<div>
					<div className="inputTitle">비밀번호 확인</div>
					<input
						className="passwordCheck"
						type="password"
						placeholder="비밀먼호를 한번 더 입력해주세요. "
						value={info.passwordCheck}
						onChange={handleChange}
					/>
				</div>
				<div>
					<div className="inputTitle">닉네임</div>
					<input
						className="nickname"
						type="nickname"
						placeholder="닉네임을 입력해주세요. "
						value={info.nickname}
						onChange={handleChange}
					/>
				</div>
				<div>
					<div className="inputTitle">전화번호</div>
					<input
						className="phone"
						type="phonenumber"
						placeholder="휴대폰 번호를 입력해주세요. "
						value={info.phone}
						onChange={handleChange}
					/>
				</div>
				<div>
					<div className="inputTitle">소속기관 (선택)</div>
					<input
						className="organization"
						type="text"
						placeholder="소속 기관을 입력해주세요. "
						value={info.organization}
						onChange={handleChange}
					/>
				</div>

				<button onClick={signupSubmit}>회원가입</button>
			</div>
		</div>
	);
};

export default Index;
