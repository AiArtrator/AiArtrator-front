import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profileimg from '../../../assets/profile.png';
import './mymenu.scss';
const Index = () => {
	const usernickname = useSelector((state) => state.user?.user?.nickname);
	return (
		<>
			<Link to="/MyInfo">
				<img className="profile-img" src={Profileimg} alt="profile" />
				{usernickname}
			</Link>
		</>
	);
};

export default Index;
