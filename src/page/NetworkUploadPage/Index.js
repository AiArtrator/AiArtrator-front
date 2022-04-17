import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { NetworkDetailForm } from '../../components/NetworkUpload';
import { WeightUploadForm } from '../../components/NetworkUpload';

const Index = () => {
	const [stage, setStage] = useState(0);
	let { postId } = useParams();
	return (
		<NetworkUploadContainer>
			<FormContainer>
				{!stage ? (
					<NetworkDetailForm setStage={setStage} postId={postId} />
				) : (
					<WeightUploadForm setStage={setStage} postId={postId} />
				)}
			</FormContainer>
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
