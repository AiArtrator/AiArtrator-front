import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = () => {
	const accesstoken = useSelector((state) => state.user.accesstoken);
	console.log(accesstoken);
	return accesstoken ? <Outlet /> : <Navigate to="/login" />;
};

// AuthRoute.propTypes = {
// 	children: PropTypes.element,
// 	rest: PropTypes.object,
// };

export default AuthRoute;
