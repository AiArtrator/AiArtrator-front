import React from 'react';
import './navbar.scss';
import Logo from './NavTitle/Index.js';
import ModelLists from './ModelLists/Index.js';
import MyMenus from './MyMenu/Index.js';
import LogIn from './LogInButton/Index.js';
import OwnNetworksBtn from './MyMenu/OwnNetworksButton/Index.js';
import { Link } from 'react-router-dom';

const Index = () => {
	return (
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
							<OwnNetworksBtn />
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
	);
};

export default Index;
