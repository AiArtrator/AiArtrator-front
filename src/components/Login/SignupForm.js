/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { signup } from '../../axios/User';
import { setAccsstoken, setUser } from '../../reducers/user';

const Index = () => {
	const dispatch = useDispatch();
	const userState = useSelector((state) => state.user);
	const [info, setInfo] = useState({});

	const submit = async () => {
		try {
			const res = await signup(info);
			console.log(`[+] signup: ${res.data.data}`);
			dispatch(setUser(res.data.data.user));
			dispatch(setAccsstoken(res.data.data.accesstoken));
			console.log(userState);
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
		} else if (className === 'organization') {
			setInfo({ ...info, organization: value });
		} else if (className === 'loginId') {
			setInfo({ ...info, loginId: value });
		} else {
			console.err('[-] error from SignupForm');
		}
	};

	const handleKeyDown = (e) => {
		if (e.which === 13) {
			const nextSibling = e.target.nextElementSibling;
			if (nextSibling?.tagName === 'INPUT') {
				nextSibling.focus();
			} else {
				submit();
			}
		}
	};

	return (
		<SignupForm>
			<input
				className="loginId"
				placeholder="login id"
				type="text"
				value={info.loginId}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			<input
				className="email"
				placeholder="email"
				type="email"
				value={info.email}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			<input
				className="password"
				placeholder="password"
				type="password"
				value={info.password}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			<input
				className="organization"
				placeholder="organization"
				type="text"
				value={info.organization}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
		</SignupForm>
	);
};

export default Index;

const SignupForm = styled.div`
	position: relative;
	width: 200px;
	height: 100px;
`;
