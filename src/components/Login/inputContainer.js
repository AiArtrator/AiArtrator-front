import styled from 'styled-components';

const Input = styled.div`
	position: relative;
	display: flex;
	font-size: 15px;
	margin: 15px 0px;
	.title {
		width: 130px;
	}
	input {
		width: calc(100% - 130px);
		border: 1px solid;
		font-size: 20px;
	}
`;

export default Input;
