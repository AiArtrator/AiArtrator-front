import styled from 'styled-components';

const Input = styled.div`
	position: relative;
	display: flex;
	margin: 15px 0px;
	.inputTitle {
		font-size: 17px;
		width: 200px;
		margin: 10px;
	}
	input {
		font-size: 20px;
		width: calc(100% - 14px); // padding
		padding: 7px;
		border: 0px;
		border-bottom: 2px solid rgba(0, 0, 0, 0.5);
		outline: none;
	}
	textarea {
		font-size: 20px;
		resize: none;
		width: calc(100% - 18px); // padding + border
		padding: 7px;
		border: 2px solid rgba(0, 0, 0, 0.5);
		font-family: inherit;
		font-size: inherit;
		font-weight: 600;
		outline: none;
	}
`;

export default Input;
