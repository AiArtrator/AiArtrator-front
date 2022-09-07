import React from 'react';
import styled from 'styled-components';
import { Library } from '../../components/Library';

const Index = () => {
	return (
		<LibraryContainer>
			<Library />
		</LibraryContainer>
	);
};

const LibraryContainer = styled.div`
	position: relative;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-around;
`;

export default Index;
