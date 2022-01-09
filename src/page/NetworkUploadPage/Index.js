import React from 'react';
import styled from 'styled-components';
import { NetworkDetailForm } from '../../components/NetworkUpload';

const Index = () => {
	return (
		<NetworkUploadContainer>
			<FormContainer>
				<NetworkDetailForm newNetwork />
			</FormContainer>
		</NetworkUploadContainer>
	);
};

const NetworkUploadContainer = styled.div`
	position: relative;
	margin-top: 300px;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-around;
`;
const FormContainer = styled.div`
	position: relative;
	width: 100%;
	height: max-content;
	font-size: 16px;
	font-weight: 600;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export default Index;
