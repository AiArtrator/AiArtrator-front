import React from 'react';
import './navbar.scss';
import Logo from './NavTitle/Index.js';
import ModelLists from './ModelLists/Index.js';
import MyMenus from './MyMenu/Index.js';
import LogIn from './LogInButton/Index.js';
import Logout from './LogoutButton/Index.js';
import NetworkUploadBtn from './MyMenu/NetworkUploadButton/Index.js';
import OwnNetworksBtn from './MyMenu/OwnNetworksButton/Index.js';
import MyNetworksBtn from './MyMenu/MyNetworksButton/Index.js';
import { useSelector } from 'react-redux';

const Index = () => {
	const accesstoken = useSelector((state) => state.user.accesstoken);
	return (
		<div className="dropmenu">
			<ul>
				{accesstoken ? (
					<li>
						<MyMenus />
						<ul>
							<li>
								<NetworkUploadBtn />
							</li>
							<li>
								<OwnNetworksBtn />
							</li>
							<li>
								<MyNetworksBtn />
							</li>
							<li>
								<Logout />
							</li>
						</ul>
					</li>
				) : (
					<li>
						<LogIn />
					</li>
				)}
				{/* <li>
					<LogIn />
				</li>
				<li>
					<MyMenus />
					<ul>
						<li>
							<NetworkUploadBtn />
						</li>
						<li>
							<OwnNetworksBtn />
						</li>
						<li>
							<MyNetworksBtn />
						</li>
						<li>
							<Link to="/">임시 로그아웃</Link>
						</li>
					</ul>
				</li> */}
				<li>
					<ModelLists />
				</li>
				<li>
					<Logo />
				</li>
			</ul>
		</div>
	);
};

export default Index;
