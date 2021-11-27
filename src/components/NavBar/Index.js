import React from 'react';
import './navbar.scss';
import Logo from './NavTitle/Index.js';
import ModelLists from './ModelLists/Index.js';
import MyMenus from './MyMenu/Index.js';
import LogIn from './LogInButton/Index.js';

import { Link } from 'react-router-dom';

const Index = () => {
	return (
		<div className="nav-layout">
			<div className="dropmenu">
				<ul>
					<li>
						<Logo />
					</li>
					<li>
						<ModelLists />
					</li>
					<li>
						<MyMenus />
						<ul>
							<li>
								<Link to="/NetworkLists">내가 구매한 모델들</Link>
							</li>
							<li>
								<Link to="/">임시 로그아웃</Link>
							</li>
						</ul>
					</li>
					<li>
						<LogIn />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Index;
