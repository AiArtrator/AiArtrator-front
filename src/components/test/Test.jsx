import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';

const TestComponent = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
	background-color: blue;
`;
const get_infer = async () => {
	const res = await Axios.get(`http://localhost:8000/api/inference`);
	console.log(res);
	return res;
};

const Test = () => {

	return (
		<TestComponent>
			<button onClick={() => get_infer()}> Infer </button>
		</TestComponent >
	);
};

export default Test;
