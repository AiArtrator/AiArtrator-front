import React from 'react';
import styled from 'styled-components';
import { NetworkDetailForm2 } from '../../components/NetworkUpload2';

const Index = () => {
	return (
		<NetworkUploadContainer>
			<FormContainer>
				<NetworkDetailForm2 />
			</FormContainer>
			{/* <FormContainer>
				<WeightUploadForm2 />
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