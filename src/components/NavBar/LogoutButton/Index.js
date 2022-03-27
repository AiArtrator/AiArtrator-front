import React from 'react';
import { Link } from 'react-router-dom';
import { userLogout } from '../../../reducers/user';
import { useDispatch } from 'react-redux';

const Index = () => {
	const dispatch = useDispatch();
	return (
		<>
			<Link to="/" onClick={() => dispatch(userLogout)}>
				로그아웃
			</Link>
		</>
	);
};

export default Index;
