import React from 'react';
import styled from 'styled-components';
import { NetworkDetail } from '../../components/NetworkDetail';

const Index = () => {
	return (
		<NetworkDetailContainer>
			<NetworkDetail />
		</NetworkDetailContainer>
	);
};

const NetworkDetailContainer = styled.div`
	position: relative;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-around;
`;

export default Index;
