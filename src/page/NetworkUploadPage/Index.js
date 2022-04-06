import React from 'react';
import styled from 'styled-components';
import { NetworkDetailForm } from '../../components/NetworkUpload';

const Index = () => {
	return (
		<NetworkUploadContainer>
			<FormContainer>
				<NetworkDetailForm />
			</FormContainer>
			{/* <FormContainer>
				<WeightUploadForm />
			</FormContainer> */}
		</NetworkUploadContainer>
	);
};

const NetworkUploadContainer = styled.div`
	position: relative;
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
`;

export default Index;
