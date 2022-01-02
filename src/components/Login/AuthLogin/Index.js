import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth-login.scss';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../axios/User';
import { setAccsstoken, setUser } from '../../../reducers/user';

const Index = () => {
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
		<div className="login">
			<div className="background">
				<div className="shape"></div>
			</div>

			<div className="form">
				<h3>Platform Of</h3>
				<h3>Generative model</h3>

				<label>User ID</label>
				<input
					type="text"
					placeholder="ID를 입력해주세요."
					id="email"
					value={info.email}
					onChange={handleChange}
				/>

				<label>Password</label>
				<input
					type="password"
					placeholder="비밀먼호를 입력해주세요. "
					id="password"
					value={info.password}
					onChange={handleChange}
				/>

				<button onClick={loginSubmit}>로그인 Log-In</button>
				<Link to="/Signup">
					<button>1초만에 회원가입</button>
				</Link>

				<div className="social">
					<div className="go">
						<i className="fab fa-google"></i> Kakaotalk
					</div>
					<div className="fb">
						<i className="fab fa-facebook"></i> Google
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
