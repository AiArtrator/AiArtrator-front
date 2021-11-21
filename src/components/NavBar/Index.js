import React from 'react';
import './navbar.scss';
import Logo from './NavTitle/Index.js';
import ModelLists from './ModelLists/Index.js';
import MyMenus from './MyMenu/Index.js';
import LogIn from './LogInButton/Index.js';

const Index = () => {
	return (
		<>
			<Logo />
			<ModelLists />
			<MyMenus />
			<LogIn />
		</>
	);
};

export default Index;
