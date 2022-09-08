import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = () => {
	const accesstoken = useSelector((state) => state.user.accesstoken);
	return accesstoken ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
