import React from 'react';
import styled from 'styled-components';
import { SignupForm } from '../../components/Login';

const Index = () => {
	return (
		<SignupContainer>
			<SignupForm />
		</SignupContainer>
	);
};

const SignupContainer = styled.div`
	position: relative;
	width: max-content;
	height: max-content;
	font-size: 16px;
	font-weight: 600;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export default Index;
