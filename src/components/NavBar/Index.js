import React from 'react';
import './navbar.scss';
import ModelLists from './ModelLists/Index.js';
import MyMenus from './MyMenu/Index.js';
import LogIn from './LogInButton/Index.js';
import Logout from './LogoutButton/Index.js';
import NetworkUploadBtn from './MyMenu/NetworkUploadButton/Index.js';
import OwnNetworksBtn from './MyMenu/MyNetworksButton/Index.js';
import { useSelector } from 'react-redux';
import MainLogo from '../../assets/logo/MainLogoH1.png';
import { useNavigate } from 'react-router-dom';

const Index = () => {
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const navigate = useNavigate();
	return (
		<div className="nav-layout">
			<img
				className="logo"
				src={MainLogo}
				onClick={() => {
					navigate('/');
				}}
			/>
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
									<Logout />
								</li>
							</ul>
						</li>
					) : (
						<li>
							<LogIn />
						</li>
					)}

					<li>
						<ModelLists />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Index;
