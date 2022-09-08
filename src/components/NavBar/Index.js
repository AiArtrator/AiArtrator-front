/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import './navbar.scss';

import ModelLists from './ModelLists/Index.js';
import MyMenus from './MyMenu/Index.js';
import LogIn from './LogInButton/Index.js';
import Logout from './LogoutButton/Index.js';
import MyTokenAccount from './MyTokenAccount/Index.js';
import NetworkUploadBtn from './MyMenu/NetworkUploadButton/Index.js';
import OwnNetworksBtn from './MyMenu/MyNetworksButton/Index.js';

import MainLogo from '../../assets/logo/MainLogoH1.png';
import { tokenStatusInNav } from '../../axios/User';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Index = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const accesstoken = useSelector((state) => state.user.accesstoken);

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
									<MyTokenAccount />
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
