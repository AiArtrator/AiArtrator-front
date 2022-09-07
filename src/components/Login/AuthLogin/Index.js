import React, { useState } from 'react';

import './login-form.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { login } from '../../../axios/User';
import { setAccsstoken, setUser } from '../../../reducers/user';

import Logo from '../../../assets/logo/MainLogoH1.png';

const Index = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state) => state.user);

	const [info, setInfo] = useState({
		email: '',
		password: '',
	});

	const loginSubmit = async () => {
		try {
			const res = await login(info);
			console.log(`[+] login - res data: ${JSON.stringify(res.data.data)}`);
			dispatch(setUser(res.data.data.user));
			dispatch(setAccsstoken(res.data.data.accesstoken));
			console.log(`[+] login - userState: ${JSON.stringify(userState)}`);
			navigate('/');
		} catch (err) {
			console.error(err);
			if (err.response.data.status === (403 || 412)) {
				alert(t('login_alert1'));
			} else {
				alert(err.response.data.message);
			}
		}
	};

	const handleChange = (e) => {
		const id = e.target.id;
		const value = e.target.value;
		if (id === 'email') {
			setInfo({ ...info, email: value });
		} else if (id === 'password') {
			setInfo({ ...info, password: value });
		} else {
			console.log('[-] error from AuthLogin');
		}
	};

	return (
		<div className="login-form">
			<div className="background">
				<div className="shape"></div>
			</div>

			<div className="form">
				<div className="image">
					<img src={Logo} alt="logo" />
				</div>

				<label>User ID</label>
				<input
					type="text"
					id="email"
					placeholder="Type your email."
					value={info.email}
					onChange={handleChange}
				/>

				<label>Password</label>
				<input
					type="password"
					id="password"
					placeholder="Type your password. "
					value={info.password}
					onChange={handleChange}
				/>

				<button onClick={loginSubmit}>{t('login_btn')}</button>
				<Link to="/Signup">
					<button>{t('try_signup')}</button>
				</Link>
			</div>
		</div>
	);
};

export default Index;
