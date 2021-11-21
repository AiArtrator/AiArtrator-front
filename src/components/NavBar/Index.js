import React from 'react';
import './navbar.scss';
import Logo from './NavTitle/Index.js';
import ModelLists from './ModelLists/Index.js';
import MyMenus from './MyMenu/Index.js';
import LogIn from './LogInButton/Index.js';
import OwnNetworksBtn from './MyMenu/OwnNetworksButton/Index.js';

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
						<li>로그아웃</li>
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
