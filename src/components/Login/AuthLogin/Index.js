import React from 'react';
import { Link } from 'react-router-dom';
import './auth-login.scss';

const Index = () => {
	return (
		<div className="login">
			<div className="background">
				<div className="shape"></div>
			</div>

			<div className="form">
				<h3>Platform Of</h3>
				<h3>Generative model</h3>

				<label>User ID</label>
				<input type="text" placeholder="ID를 입력해주세요." id="username" />

				<label>Password</label>
				<input
					type="password"
					placeholder="비밀먼호를 입력해주세요. "
					id="password"
				/>

				<button>로그인 Log-In</button>
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
