/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signup } from '../../axios/User';
import { setAccsstoken, setUser } from '../../reducers/user';
import { MainLogo } from '../Logo';
import { Input, SubmitButton } from '.';

const Index = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state) => state.user);
	const [info, setInfo] = useState({
		loginId: '',
		password: '',
		passwordCheck: '',
		email: '',
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
		} else if (className === 'loginId') {
			setInfo({ ...info, loginId: value });
		} else {
			console.err('[-] error from SignupForm');
		}
	};

	return (
		<SignupForm>
			<div className="logoContainer">
				<MainLogo />
			</div>
			<Input>
				<div className="title">아이디</div>
				<input
					className="loginId"
					type="text"
					value={info.loginId}
					onChange={handleChange}
				/>
			</Input>
			<Input>
				<div className="title">비밀번호</div>
				<input
					className="password"
					type="password"
					value={info.password}
					onChange={handleChange}
				/>
			</Input>
			<Input>
				<div className="title">비밀번호 확인</div>
				<input
					className="passwordCheck"
					type="password"
					value={info.passwordCheck}
					onChange={handleChange}
				/>
			</Input>
			<Input>
				<div className="title">이메일</div>
				<input
					className="email"
					type="email"
					value={info.email}
					onChange={handleChange}
				/>
			</Input>
			<Input>
				<div className="title">소속기관</div>
				<input
					className="organization"
					type="text"
					value={info.organization}
					onChange={handleChange}
				/>
			</Input>
			<div className="submitButtonContainer" onClick={signupSubmit}>
				<SubmitButton>회원가입</SubmitButton>
			</div>
		</SignupForm>
	);
};

export default Index;

const SignupForm = styled.div`
	position: relative;
	.logoContainer {
		margin-bottom: 50px;
	}
	.submitButtonContainer {
		margin-top: 30px;
	}
`;
