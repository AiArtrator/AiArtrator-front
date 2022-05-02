import React, { useEffect, useState } from 'react';
import './navbar.scss';
import ModelLists from './ModelLists/Index.js';
import MyMenus from './MyMenu/Index.js';
import LogIn from './LogInButton/Index.js';
import Logout from './LogoutButton/Index.js';
import MyTokenAccount from './MyTokenAccount/Index.js';
import NetworkUploadBtn from './MyMenu/NetworkUploadButton/Index.js';
import OwnNetworksBtn from './MyMenu/MyNetworksButton/Index.js';
import { useSelector } from 'react-redux';
import MainLogo from '../../assets/logo/MainLogoH1.png';
import { useNavigate } from 'react-router-dom';
import { tokenStatusInNav } from '../../axios/User';

const Index = () => {
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const navigate = useNavigate();
	const [nowToken, setNowToken] = useState('0');

	useEffect(() => {
		const fetchData = async () => {
			setNowToken(0);
			try {
				const response = await tokenStatusInNav(accesstoken); // TODO : replace to getNetworkByUserId
				setNowToken(response.data.data.balance);
				console.log(response.data);
				console.log(response.data.data.balance);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);
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
								<li
									style={{
										height: '0.6rem',
										fontSize: '0.5rem',
										color: 'white',
										background: 'rgba(0, 0, 0, 0.728)',
										verticalAlign: 'center',
										display: 'block',
										lineHeight: '30px',
										margin: '0px',
										padding: '10px',
									}}
								>
									보유 토큰
								</li>
								<li
									style={{
										height: '2rem',
										fontWeight: '400',
										color: 'white',
										background: 'rgba(0, 0, 0, 0.728)',
										verticalAlign: 'center',
										display: 'block',

										margin: '0px',
										padding: '0px 10px',
									}}
								>
									{nowToken} Token
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
