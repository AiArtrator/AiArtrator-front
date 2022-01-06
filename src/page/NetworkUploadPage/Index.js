import React from 'react';
import styled from 'styled-components';
import { InferenceForm } from '../../components/NetworkUpload';

const Index = () => {
	return (
		<InferenceFormContainer>
			<InferenceForm />
		</InferenceFormContainer>
	);
};

const InferenceFormContainer = styled.div`
	position: relative;
	width: 900px;
	height: 300px;
	font-size: 16px;
	font-weight: 600;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export default Index;
