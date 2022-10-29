import React from 'react';
import { Route } from 'react-router-dom';
import { AuthWrapper } from '../../components/Login';

const Index = () => {
	return (
		<AuthWrapper>
			<Route path="/Signup">회원가입</Route>
		</AuthWrapper>
	);
};

export default Index;
